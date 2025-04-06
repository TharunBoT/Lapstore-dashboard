import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Brand } from '../../../shared/models/brand';
import { BrandFormComponent } from '../brand-form/brand-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit{
  brands: Brand[] = []; // <- an empty array for the brand
  dataSource = new MatTableDataSource<Brand>();
  displayedColumns: string[] = ['id', 'name', 'description', 'actions']; // <-columns to be displayed tables

  constructor(private apiService:ApiService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.apiService.getBrands().subscribe(brands => {
      this.brands = brands;
      this.dataSource.data = brands;
    });
  }

  openForm(brand?: Brand): void {
    const dialogRef = this.dialog.open(BrandFormComponent, {
      width: '500px',
      data: brand ? { ...brand } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBrands();
      }
    });
  }

  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.apiService.deleteBrand(id).subscribe(() => {
        this.loadBrands();
      });
    }
  }
}
