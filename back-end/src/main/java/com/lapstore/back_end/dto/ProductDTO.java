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
    private double price;
    private String processor;
    private int ramGB;
    private int storageGB;
    private String brandName;

    public ProductDTO(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.processor = product.getProcessor();
        this.ramGB = product.getRamGB();
        this.storageGB = product.getStorageGB();
        this.brandName = product.getBrand().getName();
    }
}
