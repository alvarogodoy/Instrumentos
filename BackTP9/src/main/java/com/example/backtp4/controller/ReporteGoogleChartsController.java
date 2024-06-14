package com.example.backtp4.controller;

import com.example.backtp4.dto.OrdersByInstrumentoDTO;
import com.example.backtp4.dto.OrdersByMonthDTO;
import com.example.backtp4.repo.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/reportes")
@CrossOrigin
public class ReporteGoogleChartsController {
    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping("/by-month")
    public ResponseEntity<List<OrdersByMonthDTO>> getOrdersByMonth() {
        List<OrdersByMonthDTO> orders = pedidoRepository.findOrdersGroupedByMonth();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/by-instrument")
    public ResponseEntity<List<OrdersByInstrumentoDTO>> getOrdersByInstrument() {
        List<OrdersByInstrumentoDTO> orders = pedidoRepository.findOrdersGroupedByInstrument();
        return ResponseEntity.ok(orders);
    }
}
