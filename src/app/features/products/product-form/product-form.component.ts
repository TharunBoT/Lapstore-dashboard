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
  productForm: FormGroup;
  brands: Brand[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      processor: ['', Validators.required],
      ramGB: [1, [Validators.required, Validators.min(1)]],
      storageGB: [128, [Validators.required, Validators.min(128)]],
      brandId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBrands();

    if (this.data) {
      this.isEditMode = true;
      this.productForm.patchValue({
        id: this.data.id ?? null,
        name: this.data.name ?? '',
        price: this.data.price ?? 0,
        processor: this.data.processor ?? '',
        ramGB: this.data.ramGB ?? 1,
        storageGB: this.data.storageGB ?? 128,
        brandId: this.data.brand?.id ?? ''
      });
    }
  }

  loadBrands(): void {
    this.apiService.getBrands().subscribe({
      next: (brands: Brand[]) => {
        this.brands = brands;
      },
      error: (err) => {
        console.error('Error loading brands:', err);
      }
    });
  }

  onSubmit(): void {
  if (this.productForm.invalid) return;

  // Get the form data
  const formData = this.productForm.value;
  const productData = {
    name: formData.name,
    price: formData.price,
    processor: formData.processor,
    ramGB: formData.ramGB,
    storageGB: formData.storageGB,
    brandId: formData.brandId
  };

  // Log the data to see what is being sent to the API
  console.log('Form data:', formData);
  console.log('Request data:', productData);

  // Decide if we are in edit mode or create mode
  const request$ = this.isEditMode
    ? this.apiService.updateProduct({ ...productData, id: formData.id })
    : this.apiService.createProduct(productData);

  request$.subscribe({
    next: () => this.dialogRef.close(true),
    error: (err) => console.error('Error submitting product form:', err)
  });
}


  onCancel(): void {
    this.dialogRef.close(false);
  }
}
