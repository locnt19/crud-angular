import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private _subscription$ = new Subscription();

  constructor(private _activatedRoute: ActivatedRoute) {}

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
          console.log(params.id);
        }
      })
    );
  }
}
