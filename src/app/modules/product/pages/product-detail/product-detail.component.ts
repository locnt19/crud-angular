import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private _subscription$ = new Subscription();
  product: IProduct;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this._getProductIdFromURL();
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _getProductIdFromURL(): void {
    this._subscription$.add(
      this._activatedRoute.params.subscribe(params => {
        if (params.id) {
          this._getProduct(params.id);
        }
      })
    );
  }

  private _getProduct(id: string) {
    this._subscription$.add(
      this._productService.getProduct(id).subscribe(res => {
        this.product = res;
      })
    );
  }
}
