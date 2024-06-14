package com.example.backtp4.dto;

public class OrdersByInstrumentoDTO {
    private String instrumentName;
    private Long orderCount;

    public OrdersByInstrumentoDTO(String instrumentName, Long orderCount) {
        this.instrumentName = instrumentName;
        this.orderCount = orderCount;
    }

    public String getInstrumentName() {
        return instrumentName;
    }

    public void setInstrumentName(String instrumentName) {
        this.instrumentName = instrumentName;
    }

    public Long getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Long orderCount) {
        this.orderCount = orderCount;
    }
}
