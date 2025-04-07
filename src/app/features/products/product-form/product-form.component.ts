import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Brand } from '../../../shared/models/brand';
import { Product } from '../../../shared/models/product';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  productForm!:FormGroup;
  brands: Brand[] = []; // <- define an empty array for the brand at the start of the fetch

  constructor(
    private fb:FormBuilder,
    private productService: ApiService,
    private brandService: ApiService
  ){}

  // builds an form with given variables and check validations (function of form builder)
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      processor: ['', Validators.required],
      ram: ['', Validators.required],
      rom: ['', Validators.required],
      brandId: [null, Validators.required]
    });

    this.loadBrands();
  }

  // calling api service, fetch products from the back end and stores in the empty array we created
  loadBrands():void{
    this.brandService.getBrands().subscribe((data:Brand[])=>{
      this.brands = data;
    });
  }

  // if the form inputs are valid it sends an api request to the backend to create product 
  onSubmit(): void {
    if (this.productForm.valid) { // <- checks the validations
      const newProduct: Product = this.productForm.value; // <- retrieve the data from inputs and store them as a object (newProduct)

      this.productService.createProduct(newProduct).subscribe({ // <- sends the api request to the backend to add newProduct object
        next: (response) => {
          alert('Product created successfully!');
          this.productForm.reset();
        },
        error: (error) => {
          console.error('Error creating product', error);
          alert('Failed to create product.');
        }
      });
    }
  }
}
