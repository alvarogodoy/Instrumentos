package com.example.backtp4.controller;

import com.example.backtp4.model.CategoriaInstrumento;
import com.example.backtp4.repo.CategoriaInstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/categorias")
public class CategoriaInstrumentoController {

    @Autowired
    private CategoriaInstrumentoRepository categoriaInstrumentoRepository;

    @GetMapping("")
    public ResponseEntity<List<CategoriaInstrumento>> getInstrumentos (){
        List<CategoriaInstrumento> categorias = categoriaInstrumentoRepository.findAll();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaInstrumento> getProductById(@PathVariable Long id) {
        Optional<CategoriaInstrumento> categoriaOptional = categoriaInstrumentoRepository.findById(id);
        if (categoriaOptional.isPresent()) {
            CategoriaInstrumento categoria = categoriaOptional.get();
            return ResponseEntity.ok(categoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
