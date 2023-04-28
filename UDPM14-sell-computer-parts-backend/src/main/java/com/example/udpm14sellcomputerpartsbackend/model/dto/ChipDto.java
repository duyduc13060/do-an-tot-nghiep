package com.example.udpm14sellcomputerpartsbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChipDto {

    private Long id;

    @NotBlank(message = "socket is not null")
    private String socket;

    @NotNull(message = "productID is not null")
    private Long productId;

    private String productName;
}
