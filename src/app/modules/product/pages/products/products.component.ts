import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscription$ = new Subscription();
  products: IProduct[];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _getProducts() {
    this._subscription$.add(
      this._productService.getProducts().subscribe(res => {
        this.products = res;
      })
    );
  }
}
