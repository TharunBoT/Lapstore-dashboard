import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './features/brands/brand-list/brand-list.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';
import { ProductUpdateComponent } from './features/products/product-update/product-update.component';

export const routes: Routes = [
    {path: 'brands', component: BrandListComponent},
    {path: 'products', component: ProductListComponent},

    // admin routes
    {path: 'add-product', component: ProductFormComponent},
    {path: 'products/edit/:id', component: ProductUpdateComponent},

    // main route
    {path: '', redirectTo: '/products', pathMatch:'full'}
];