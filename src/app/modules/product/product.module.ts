import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './services/product.service';
import { ProductCardService } from './services/product-card.service';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDialogCreateUpdateComponent } from './components/product-dialog-create-update/product-dialog-create-update.component';
import { ProductDialogDeleteComponent } from './components/product-dialog-delete/product-dialog-delete.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductCardComponent,
    ProductDialogCreateUpdateComponent,
    ProductDialogDeleteComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [ProductService, ProductCardService]
})
export class ProductModule {}
