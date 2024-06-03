package com.example.backtp4.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaInstrumento {
    @Id
    private Long id;
    private String denominacion;
}
