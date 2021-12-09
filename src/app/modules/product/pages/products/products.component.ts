import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductCardService } from '../../services/product-card.service';
import {
  ECardCTA,
  IProduct,
  IProductCTA
} from '../../models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscription$: Subscription;
  products: IProduct[];
  productCTA: IProductCTA[];

  constructor(private _productService: ProductService) {
    this._subscription$ = new Subscription();
    this.productCTA = [
      {
        label: 'Detail',
        value: ECardCTA.view_detail
      },
      {
        label: 'Update',
        value: ECardCTA.update
      },
      {
        label: 'Delete',
        value: ECardCTA.delete
      }
    ];
  }

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
