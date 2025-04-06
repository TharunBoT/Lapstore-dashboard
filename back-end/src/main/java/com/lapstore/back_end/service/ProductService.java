package com.lapstore.back_end.service;

import com.lapstore.back_end.dto.ProductDTO;
import com.lapstore.back_end.model.Brand;
import com.lapstore.back_end.model.Product;
import com.lapstore.back_end.repository.BrandRepository;
import com.lapstore.back_end.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    public ProductDTO createProducts(ProductDTO dto){
        Product product = convertToEntity(dto);
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public List<ProductDTO> getAllProducts(){
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(dto.getName());
        existingProduct.setDescription(dto.getDescription());
        existingProduct.setProcessor(dto.getProcessor());
        existingProduct.setRam(dto.getRam());
        existingProduct.setRom(dto.getRom());

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        existingProduct.setBrand(brand);

        Product updated = productRepository.save(existingProduct);
        return convertToDTO(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setProcessor(product.getProcessor());
        dto.setRam(product.getRam());
        dto.setRom(product.getRom());
        dto.setBrandId(product.getBrand().getId());
        dto.setBrandName(product.getBrand().getName());
        return dto;
    }

    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setProcessor(dto.getProcessor());
        product.setRam(dto.getRam());
        product.setRom(dto.getRom());

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        product.setBrand(brand);

        return product;
    }
}
