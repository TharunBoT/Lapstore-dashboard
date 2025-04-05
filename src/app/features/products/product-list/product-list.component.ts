import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../../shared/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginator,
    MatSortModule,
    MatTableModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'name', 'price', 'processor', 'ramGB', 'storageGB', 'brand', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Custom sorting for the brand column
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'brand') {
        return item.brand?.name || '';
      }
      return item[property as keyof Product] as string;
    };
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
      this.dataSource.data = products;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm(product?: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: product ? { ...product } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}