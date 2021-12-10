import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  EProductAction,
  IProduct,
  IProductCardAction
} from '../../models/product.interface';
import { ProductCardService } from '../../services/product-card.service';
import { ProductService } from '../../services/product.service';
import { ProductDialogDeleteComponent } from '../product-dialog-delete/product-dialog-delete.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;
  @Input() actions: IProductCardAction[];
  private _subscription$: Subscription;
  private _actions$: Subject<EProductAction>;
  private _debounceTime: number;

  constructor(
    private _productCardService: ProductCardService,
    private _matDialog: MatDialog,
    private _productService: ProductService
  ) {
    this._subscription$ = new Subscription();
    this._actions$ = new Subject();
    this._debounceTime = 300;
    this._listenCtaCard();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _listenCtaCard(): void {
    this._subscription$.add(
      this._actions$
        .pipe(debounceTime(this._debounceTime))
        .subscribe(action => {
          if (action === EProductAction.update) {
            this._openDialogUpdate();
            return;
          }

          if (action === EProductAction.delete) {
            this._openDialogDelete();
            return;
          }
        })
    );
  }

  private _openDialogUpdate(): void {
    const dialogRef = this._matDialog.open(ProductDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Update product',
        action: EProductAction.update,
        actionLabel: 'Update',
        product: this.product
      }
    });

    this._subscription$.add(
      dialogRef.afterClosed().subscribe((data?: IProduct) => {
        if (data) {
          this._updateProduct(data);
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

  private _updateProduct(product: IProduct): void {
    this._subscription$.add(
      this._productService.updateProduct(product).subscribe(res => {
        this.product = res;
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

  callToAction(action: EProductAction): void {
    if (action === EProductAction.view_detail) {
      this._productCardService.navigateProductDetail(
        this.product.id.toString()
      );
      return;
    }

    this._actions$.next(action);
  }
}
