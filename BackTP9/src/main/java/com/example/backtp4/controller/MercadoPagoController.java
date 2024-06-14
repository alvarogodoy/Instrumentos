package com.example.backtp4.controller;
import com.example.backtp4.model.Pedido;
import com.example.backtp4.model.PreferenceMP;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MercadoPagoController {

    public PreferenceMP getPreferenceMP(Pedido pedido) {
        try {
            MercadoPagoConfig.setAccessToken("TEST-6982500829203442-052218-df3ad459a44c50881486513253d3f41d-279025291");
            PreferenceItemRequest itemRequest =
                    PreferenceItemRequest.builder()
                            .id(pedido.getId().toString())
                            .unitPrice(BigDecimal.valueOf(pedido.getTotalPedido()))
                            .currencyId("ARS")
                            .quantity(1)
                            .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);
            PreferenceBackUrlsRequest preferenceBackUrlsRequest = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/instrumentos").failure("http://localhost:5173/instrumentos").pending("http://localhost:5173/instrumentos").build();
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(preferenceBackUrlsRequest)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            return PreferenceMP.builder()
                    .id(preference.getId())
                    .statusCode(preference.getResponse().getStatusCode())
                    .build();
        } catch (MPApiException apiException) {
            System.err.println("MPApiException: " + apiException.getMessage());
            System.err.println("Status Code: " + apiException.getStatusCode());
            System.err.println("Response: " + apiException.getApiResponse().getContent());
            apiException.printStackTrace();
        } catch (MPException mpException) {
            System.err.println("MPException: " + mpException.getMessage());
            mpException.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
