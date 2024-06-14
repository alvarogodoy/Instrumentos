package com.example.backtp4.repo;

import com.example.backtp4.dto.OrdersByInstrumentoDTO;
import com.example.backtp4.dto.OrdersByMonthDTO;
import com.example.backtp4.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT new com.example.backtp4.dto.OrdersByMonthDTO(CONCAT(YEAR(p.fechaPedido), '-', MONTH(p.fechaPedido)), COUNT(p)) " +
            "FROM Pedido p GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<OrdersByMonthDTO> findOrdersGroupedByMonth();

    @Query("SELECT new com.example.backtp4.dto.OrdersByInstrumentoDTO(i.instrumento, COUNT(p)) " +
            "FROM PedidoDetalle pd JOIN pd.pedido p JOIN pd.instrumento i GROUP BY i.instrumento")
    List<OrdersByInstrumentoDTO> findOrdersGroupedByInstrument();

    List<Pedido> findByFechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta);
}
