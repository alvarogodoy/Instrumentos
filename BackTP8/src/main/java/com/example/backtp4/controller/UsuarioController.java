package com.example.backtp4.controller;

import com.example.backtp4.model.Usuario;
import com.example.backtp4.repo.UsuarioRepository;
import com.example.backtp4.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordService passwordService;

    @GetMapping("")
    public ResponseEntity<List<Usuario>> getUsuarios (){
        List<Usuario> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Usuario> getUserByUsername(@PathVariable String username) {
        Optional<Usuario> user = usuarioRepository.findByNombreUsuario(username);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/checkPass")
    public ResponseEntity<Usuario> checkPasswordUser(@RequestBody Usuario usuario) {
        try {
            String hashPass = passwordService.hashPassword(usuario.getClave());
            Usuario user = usuarioRepository.findByNombreUsuario(usuario.getNombreUsuario()).get();
            if (hashPass.equals(user.getClave())) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error creando usuario: " + e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<Usuario> saveUsuario(@RequestBody Usuario usuario) {
        try {
            usuario.setClave(passwordService.hashPassword(usuario.getClave()));
            Usuario savedUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.ok(savedUsuario);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error creando usuario: " + e.getMessage());
        }
    }
}
