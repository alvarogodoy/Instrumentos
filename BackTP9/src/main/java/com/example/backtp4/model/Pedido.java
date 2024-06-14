package com.example.backtp4.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fechaPedido;
    private Double totalPedido;
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.MERGE)
    private List<PedidoDetalle> detalles = new ArrayList<>();
}
