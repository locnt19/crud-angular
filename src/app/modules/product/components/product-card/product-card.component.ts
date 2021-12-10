import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  ECardCTA,
  IProduct,
  IProductCTA
} from '../../models/product.interface';
import { ProductCardService } from '../../services/product-card.service';
import { ProductService } from '../../services/product.service';
import { ProductDialogDeleteComponent } from '../product-dialog-delete/product-dialog-delete.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;
  @Input() ctaList: IProductCTA[];
  private _subscription$: Subscription;
  private _ctaCard$: Subject<ECardCTA>;
  private _debounceTime: number;

  constructor(
    private _productCardService: ProductCardService,
    private _matDialog: MatDialog,
    private _productService: ProductService
  ) {
    this._subscription$ = new Subscription();
    this._ctaCard$ = new Subject();
    this._debounceTime = 300;

    this._listenCtaCard();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _listenCtaCard(): void {
    this._subscription$.add(
      this._ctaCard$
        .pipe(debounceTime(this._debounceTime))
        .subscribe(action => {
          if (action === ECardCTA.update) {
            // TODO: Open Update dialog
            return;
          }

          if (action === ECardCTA.delete) {
            this._openDialogDelete();
            return;
          }
        })
    );
  }

  private _openDialogDelete(): void {
    const dialogRef = this._matDialog.open(ProductDialogDeleteComponent, {
      data: this.product
    });

    this._subscription$.add(
      dialogRef.afterClosed().subscribe((data?: boolean) => {
        if (data) {
          this._deleteProduct(this.product.id.toString());
        }
      })
    );
  }

  private _deleteProduct(id: string): void {
    this._subscription$.add(
      this._productService.deleteProduct(id).subscribe(res => {
        this.product = res;
      })
    );
  }

  callToAction(action: ECardCTA): void {
    if (action === ECardCTA.view_detail) {
      this._productCardService.navigateProductDetail(
        this.product.id.toString()
      );
      return;
    }

    this._ctaCard$.next(action);
  }
}
