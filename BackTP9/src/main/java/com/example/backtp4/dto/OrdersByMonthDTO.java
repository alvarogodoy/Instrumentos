package com.example.backtp4.dto;

public class OrdersByMonthDTO {
    private String monthYear;
    private Long orderCount;

    public OrdersByMonthDTO(String monthYear, Long orderCount) {
        this.monthYear = monthYear;
        this.orderCount = orderCount;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public Long getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Long orderCount) {
        this.orderCount = orderCount;
    }
}
