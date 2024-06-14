package com.example.backtp4.controller;

import com.example.backtp4.model.Instrumento;
import com.example.backtp4.repo.InstrumentoRepository;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@RestController
@RequestMapping("/reportes")
@CrossOrigin
public class ReportePDFController {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping("/generarPDF/{id}")
    public ResponseEntity<byte[]> generarPDF(@PathVariable String id) {
        Optional<Instrumento> optionalInstrumento = instrumentoRepository.findById(id);

        if (optionalInstrumento.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Instrumento instrumento = optionalInstrumento.get();

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, baos);
            document.open();

            // Estilos para el documento
            Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD, Color.BLACK);
            Font normalFont = new Font(Font.HELVETICA, 12, Font.NORMAL, Color.BLACK);
            Font italicFont = new Font(Font.HELVETICA, 8, Font.ITALIC, Color.GRAY);
            Font descriptionFont = new Font(Font.HELVETICA, 8, Font.NORMAL, Color.BLACK);
            Font priceFont = new Font(Font.HELVETICA, 20, Font.NORMAL, Color.BLACK);
            Font envioFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);

            // Crear tabla principal
            PdfPTable mainTable = new PdfPTable(2);
            mainTable.setWidthPercentage(100);
            mainTable.setSpacingBefore(10f);
            mainTable.setSpacingAfter(10f);

            // Crear tabla izquierda: imagen y descripción
            PdfPTable leftTable = new PdfPTable(1);
            leftTable.setWidthPercentage(100);

            // Agregar imagen
            PdfPCell imageCell = new PdfPCell();
            imageCell.setBorder(Rectangle.NO_BORDER);
            byte[] imageData = downloadImage(Long.parseLong(instrumento.getId()));
            if (imageData != null) {
                Image image = Image.getInstance(imageData);
                image.scaleToFit(200, 200); // Ajustar tamaño de la imagen si es necesario
                imageCell.addElement(image);
            }
            leftTable.addCell(imageCell);

            // Agregar descripción
            PdfPCell descriptionCell = new PdfPCell();
            descriptionCell.setBorder(Rectangle.NO_BORDER);
            Paragraph description = new Paragraph("Descripción:\n" + instrumento.getDescripcion(), descriptionFont);
            descriptionCell.addElement(description);
            leftTable.addCell(descriptionCell);

            // Agregar tabla izquierda a la celda de la izquierda de la tabla principal
            PdfPCell leftMainCell = new PdfPCell(leftTable);
            leftMainCell.setBorder(Rectangle.NO_BORDER);
            mainTable.addCell(leftMainCell);

            // Crear tabla derecha: detalles del instrumento
            PdfPTable rightTable = new PdfPTable(1);
            rightTable.setWidthPercentage(100);

            // Cantidad vendida
            PdfPCell vendidosCell = new PdfPCell();
            vendidosCell.setBorder(Rectangle.NO_BORDER);
            Paragraph vendidosParagraph = new Paragraph(instrumento.getCantidadVendida() + " vendidos", italicFont);
            vendidosParagraph.setAlignment(Element.ALIGN_LEFT);
            vendidosCell.addElement(vendidosParagraph);
            rightTable.addCell(vendidosCell);

            // Título
            PdfPCell titleCell = new PdfPCell();
            titleCell.setBorder(Rectangle.NO_BORDER);
            Paragraph title = new Paragraph(instrumento.getInstrumento(), titleFont);
            title.setAlignment(Element.ALIGN_LEFT);
            titleCell.addElement(title);
            rightTable.addCell(titleCell);

            // Precio
            PdfPCell priceCell = new PdfPCell();
            priceCell.setBorder(Rectangle.NO_BORDER);
            Paragraph price = new Paragraph("$" + instrumento.getPrecio(), priceFont);
            priceCell.addElement(price);
            rightTable.addCell(priceCell);

            // Marca y modelo
            PdfPCell brandModelCell = new PdfPCell();
            brandModelCell.setBorder(Rectangle.NO_BORDER);
            Paragraph brandModel = new Paragraph("Marca: " + instrumento.getMarca() + "\nModelo: " + instrumento.getModelo(), normalFont);
            brandModelCell.addElement(brandModel);
            rightTable.addCell(brandModelCell);

            // Costo de envío
            PdfPCell shippingCell = new PdfPCell();
            shippingCell.setBorder(Rectangle.NO_BORDER);
            Paragraph shippingLabel = new Paragraph("Costo Envio:", envioFont);
            shippingCell.addElement(shippingLabel);
            if (instrumento.getCostoEnvio().equals("G")) {
                // Envío gratis
                Image truckIcon = Image.getInstance("img/camion.png");
                truckIcon.scaleToFit(15, 15);
                Paragraph freeShipping = new Paragraph("Envío gratis a todo el país", envioFont);
                Phrase phrase = new Phrase();
                phrase.add(new Chunk(truckIcon, 0, 0));
                phrase.add(freeShipping);
                shippingCell.addElement(phrase);
            } else {
                // Costo de envío
                Paragraph shippingCost = new Paragraph("$" + instrumento.getCostoEnvio(), normalFont);
                shippingCell.addElement(shippingCost);
            }
            rightTable.addCell(shippingCell);

            // Agregar tabla derecha a la celda de la derecha de la tabla principal
            PdfPCell rightMainCell = new PdfPCell(rightTable);
            rightMainCell.setBorder(Rectangle.NO_BORDER);
            mainTable.addCell(rightMainCell);

            // Agregar la tabla principal al documento
            document.add(mainTable);

            // Cerrar el documento
            document.close();

            // Configurar la respuesta para descargar el archivo PDF
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=detalle_instrumento.pdf");
            headers.set(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Método para descargar la imagen desde la carpeta local
    private byte[] downloadImage(Long instrumentoId) {
        try {
            String imagePath = "img" + File.separator + instrumentoId + ".jpg";
            File imageFile = new File(imagePath);
            if (imageFile.exists()) {
                return Files.readAllBytes(imageFile.toPath());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}