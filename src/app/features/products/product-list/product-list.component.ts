import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../../shared/models/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // <- an empty array for the product
  isLoading: boolean = true;
  displayedColumns: string[] = ['name', 'description', 'processor', 'ram', 'rom', 'brandName', 'actions'];  // Table columns

  constructor(private productService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void { // <- requesting getProduct function to fetch the product details from the backend, then to store in the empty array
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }

  // function to navigate to the addProduct form
  addProduct(): void {
    this.router.navigate(['/add-product']);  
  }

  // function to navigate to the updateProduct form
  updateProduct(productId: number): void {
    this.router.navigate([`/products/edit/${productId}`]);
  }  

  // send an api request to the backend to delete the product after identifying the id number
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Remove the deleted product from the products array
          this.products = this.products.filter(product => product.id !== productId);
          alert('Product deleted successfully');
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        }
      );
    }
  }  
}
