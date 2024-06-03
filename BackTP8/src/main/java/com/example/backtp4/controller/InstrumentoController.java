package com.example.backtp4.controller;

import com.example.backtp4.model.Instrumento;
import com.example.backtp4.repo.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/instrumentos")
public class InstrumentoController {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping("")
    public ResponseEntity<List<Instrumento>> getInstrumentos (){
        List<Instrumento> instrumentos = instrumentoRepository.findAll();
        return ResponseEntity.ok(instrumentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instrumento> getProductById(@PathVariable String id) {
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);
        if (instrumentoOptional.isPresent()) {
            Instrumento instrumento = instrumentoOptional.get();
            return ResponseEntity.ok(instrumento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Instrumento> saveProduct(@RequestBody Instrumento instrumento) {
        Instrumento savedInstrumento = instrumentoRepository.save(instrumento);
        return ResponseEntity.ok(savedInstrumento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> updateInstrumento(@PathVariable String id, @RequestBody Instrumento instrumento) {
        if (!instrumentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Instrumento updatedInstrumento = instrumentoRepository.save(instrumento);
        return ResponseEntity.ok(updatedInstrumento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInstrumento(@PathVariable String id) {
        Optional<Instrumento> instrumentoToDelete = instrumentoRepository.findById(id);
        if (instrumentoToDelete.isPresent()) {
            instrumentoRepository.delete(instrumentoToDelete.get());
        }
        return ResponseEntity.noContent().build();
    }
}
