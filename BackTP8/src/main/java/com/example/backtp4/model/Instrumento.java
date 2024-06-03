package com.example.backtp4.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "instrumento")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Instrumento {
    @Id
    private String id;
    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private String costoEnvio;
    private String cantidadVendida;
    private String descripcion;
    @ManyToOne
    private CategoriaInstrumento categoria;
    @OneToMany(mappedBy = "instrumento")
    private List<PedidoDetalle> detalles = new ArrayList<>();
}
