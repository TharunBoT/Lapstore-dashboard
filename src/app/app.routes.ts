import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './features/brands/brand-list/brand-list.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';

export const routes: Routes = [
    {path: 'brands', component: BrandListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/products', pathMatch:'full'}
];