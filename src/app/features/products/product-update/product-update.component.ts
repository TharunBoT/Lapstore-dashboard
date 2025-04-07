import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../shared/models/product';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatFormFieldModule
  ],
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']  // Fix styleUrls to use 'urls'
})
export class ProductUpdateComponent implements OnInit {
  productForm! : FormGroup;
  productId! : number;

  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private productService : ApiService,
    private router : Router
  ){}

  // variables for the form and validators from FormModule
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      processor: ['', Validators.required],
      ram: ['', Validators.required],
      rom: ['', Validators.required],
      brandId: [null, Validators.required]
    });

    this.loadProduct();
  }

  // get individual products from the id
  loadProduct():void{
    this.productService.getProduct(this.productId).subscribe(product=>{
      this.productForm.patchValue(product);
    });
  }

  // if the form inputs are valid it sends the form values to the api to update the product 
  onSubmit():void{
    if(this.productForm.valid){
      this.productService.updateProduct(this.productId, this.productForm.value)
      .subscribe(()=>{
        alert('Product updated successfully!')
        this.router.navigate(['/products']);
      })
    }
  }
}
