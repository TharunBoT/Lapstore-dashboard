package com.lapstore.back_end.service;

import com.lapstore.back_end.dto.ProductDTO;
import com.lapstore.back_end.model.Brand;
import com.lapstore.back_end.model.Product;
import com.lapstore.back_end.repository.BrandRepository;
import com.lapstore.back_end.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    public Product getProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Product not found"));
    }

    public Product createProduct(Product product, Long brandId){
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(()-> new RuntimeException("Brand not found"));
        product.setBrand(brand);
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setProcessor(updatedProduct.getProcessor());
        existingProduct.setRamGB(updatedProduct.getRamGB());
        existingProduct.setStorageGB(updatedProduct.getStorageGB());
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByBrand(Long brandId){
        return productRepository.findByBrandId(brandId);
    }
}
