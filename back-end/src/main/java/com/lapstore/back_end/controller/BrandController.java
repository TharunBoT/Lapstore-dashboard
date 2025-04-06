package com.lapstore.back_end.controller;

import com.lapstore.back_end.model.Brand;
import com.lapstore.back_end.model.Product;
import com.lapstore.back_end.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;
    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/{id}")
    public Brand getBrandById(@PathVariable Long id){
        return brandService.getBrandById(id);
    }

    @PostMapping
    public Brand createBrand(@RequestBody Brand brand){
        return brandService.createBrand(brand);
    }

    @PutMapping("/{id}")
    public Brand updateBrand(@PathVariable Long id, @RequestBody Brand brand){
        return brandService.updateBrand(id, brand);
    }

    @DeleteMapping("/{id}")
    public void deleteBrand(@PathVariable Long id){
        brandService.deleteBrand(id);
    }
}
