package com.example.backtp4.controller;

import com.example.backtp4.model.PedidoDetalle;
import com.example.backtp4.repo.PedidoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/detalles")
public class PedidoDetalleController {

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @GetMapping("")
    public ResponseEntity<List<PedidoDetalle>> getPedidoDetalles (){
        List<PedidoDetalle> pedidoDetalles = pedidoDetalleRepository.findAll();
        return ResponseEntity.ok(pedidoDetalles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDetalle> getPedidoDetalleById(@PathVariable Long id) {
        Optional<PedidoDetalle> pedidoDetalleOptional = pedidoDetalleRepository.findById(id);
        if (pedidoDetalleOptional.isPresent()) {
            PedidoDetalle PedidoDetalle = pedidoDetalleOptional.get();
            return ResponseEntity.ok(PedidoDetalle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<PedidoDetalle> savePedidoDetalle(@RequestBody PedidoDetalle pedidoDetalle) {
        PedidoDetalle savedPedidoDetalle = pedidoDetalleRepository.save(pedidoDetalle);
        return ResponseEntity.ok(savedPedidoDetalle);
    }
}
