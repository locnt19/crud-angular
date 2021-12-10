import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import {
  EProductAction,
  IProduct,
  IProductDialog
} from '../../models/product.interface';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  isUpdateNoChange: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProductDialog,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private _formBuilder: FormBuilder
  ) {
    this.productForm = this._initForm();
    this.isUpdateNoChange = false; // default for create case
    this._patchValueToFormIfActionUpdate();
    this._listenFormChangeIfActionUpdate();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

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
      this.productForm.valueChanges.subscribe((form: IProduct) => {
        if (_.isEqual(this.data.product, form)) {
          this.isUpdateNoChange = true;
          return;
        }

        this.isUpdateNoChange = false;
      });
    }
  }

  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
