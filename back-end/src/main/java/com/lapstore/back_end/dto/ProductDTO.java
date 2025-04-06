package com.lapstore.back_end.dto;

import com.lapstore.back_end.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String processor;
    private String ram;
    private String rom;
    private Long brandId;
    private String brandName;
}
