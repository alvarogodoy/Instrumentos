package com.example.backtp4.controller;

import com.example.backtp4.model.Pedido;
import com.example.backtp4.model.PreferenceMP;
import com.example.backtp4.repo.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping("")
    public ResponseEntity<List<Pedido>> getPedidos (){
        List<Pedido> pedidos = pedidoRepository.findAll();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidotById(@PathVariable Long id) {
        Optional<Pedido> pedidoOptional = pedidoRepository.findById(id);
        if (pedidoOptional.isPresent()) {
            Pedido Pedido = pedidoOptional.get();
            return ResponseEntity.ok(Pedido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Pedido> savePedido(@RequestBody Pedido pedido) {
        Pedido savedPedido = pedidoRepository.save(pedido);
        return ResponseEntity.ok(savedPedido);
    }

    @PostMapping("/preference")
    public PreferenceMP createPreference(@RequestBody Pedido pedido) {
        Pedido savedPedido = pedidoRepository.save(pedido);
        MercadoPagoController mpController = new MercadoPagoController();
        return mpController.getPreferenceMP(savedPedido);
    }
}
