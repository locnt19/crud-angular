import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import {
  EProductAction,
  IProduct,
  IProductDialog
} from '../../models/product.interface';

@Component({
  selector: 'app-product-dialog-create-update',
  templateUrl: './product-dialog-create-update.component.html',
  styleUrls: ['./product-dialog-create-update.component.scss']
})
export class ProductDialogCreateUpdateComponent implements OnInit, OnDestroy {
  private _subscription$: Subscription;
  productForm: FormGroup;
  isUpdateNoChange: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProductDialog,
    private dialogRef: MatDialogRef<ProductDialogCreateUpdateComponent>,
    private _formBuilder: FormBuilder
  ) {
    this._subscription$ = new Subscription();
    this.productForm = this._initForm();
    this.isUpdateNoChange = false; // default for create case
    this._patchValueToFormIfActionUpdate();
    this._listenFormChangeIfActionUpdate();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _initForm(): FormGroup {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    return this._formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: [
        'https://source.unsplash.com/1600x900/?product',
        Validators.required
      ],
      quantity: ['', Validators.required],
      status: ['AVAILABLE'],
      createdAt: [this._isActionCreate() ? today.toISOString() : '']
    });
  }

  private _patchValueToFormIfActionUpdate() {
    if (this._isActionUpdate()) {
      this.isUpdateNoChange = true;
      this.productForm.patchValue(this.data.product);
    }
  }

  private _isActionCreate(): boolean {
    return this.data.action === EProductAction.create;
  }

  private _isActionUpdate(): boolean {
    return this.data.product && this.data.action === EProductAction.update;
  }

  private _listenFormChangeIfActionUpdate() {
    if (this._isActionUpdate()) {
      this._subscription$.add(
        this.productForm.valueChanges.subscribe((form: IProduct) => {
          if (_.isEqual(this.data.product, form)) {
            this.isUpdateNoChange = true;
            return;
          }
          this.isUpdateNoChange = false;
        })
      );
    }
  }

  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
