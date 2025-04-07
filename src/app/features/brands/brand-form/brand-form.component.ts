import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { publishFacade } from '@angular/compiler';
import { Brand } from '../../../shared/models/brand';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent implements OnInit {
  brandForm : FormGroup;
  isEditMode = false;

  constructor(
    private fb:FormBuilder,
    private apiService: ApiService,
    public dialogRef:MatDialogRef<BrandFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Brand
  ){
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.brandForm.patchValue({
        name: this.data.name,
        description: this.data.description
      });
    }
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      const brandData = this.brandForm.value;
      
      if (this.isEditMode) {
        // Update existing brand
        this.apiService.updateBrand(this.data.id!, brandData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating brand:', err)
        });
      } else {
        // Create new brand
        this.apiService.createBrand(brandData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error creating brand:', err)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
