package com.example.backtp4.service;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class PasswordService {

    public String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : messageDigest) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

    public boolean validatePassword(String originalPassword, String hashedPassword) throws NoSuchAlgorithmException {
        String hashedOriginal = hashPassword(originalPassword);
        return hashedOriginal.equals(hashedPassword);
    }
}
