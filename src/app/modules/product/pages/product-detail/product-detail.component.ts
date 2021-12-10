import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import {
  EProductAction,
  IProduct,
  IProductCardAction
} from '../../models/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private _subscription$: Subscription;
  product: IProduct;
  productCardActions: IProductCardAction[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) {
    this._subscription$ = new Subscription();
    this.productCardActions = [
      {
        label: 'Update',
        value: EProductAction.update
      },
      {
        label: 'Delete',
        value: EProductAction.delete
      }
    ];
  }

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
