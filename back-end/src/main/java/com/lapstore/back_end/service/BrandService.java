package com.lapstore.back_end.service;

import com.lapstore.back_end.model.Brand;
import com.lapstore.back_end.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    public List<Brand> getAllBrands(){
        return brandRepository.findAll();
    }

    public Brand getBrandById(Long id){
        return brandRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Brand not found"));
    }

    public Brand createBrand(Brand brand){
        if (brandRepository.existsByName(brand.getName())){
            throw new RuntimeException("Brand already exists");
        }
        return brandRepository.save(brand);
    }

    public Brand updateBrand(Long id, Brand updatedBrand){
        Brand existingBrand = getBrandById(id);
        existingBrand.setName(updatedBrand.getName());
        existingBrand.setDescription(updatedBrand.getDescription());
        return brandRepository.save(existingBrand);
    }

    public void deleteBrand(Long id){
        brandRepository.deleteById(id);
    }
}
