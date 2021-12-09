import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EProductActions,
  IProductDialog
} from '../../models/product.interface';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProductDialog,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private _formBuilder: FormBuilder
  ) {
    this.productForm = this._initForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  private _initForm(): FormGroup {
    return this._formBuilder.group({
      id: [''],
      name: ['name', Validators.required],
      description: ['desc', Validators.required],
      price: ['123', Validators.required],
      imageUrl: [
        'https://source.unsplash.com/1600x900/?product',
        Validators.required
      ],
      quantity: ['123', Validators.required],
      status: [{ value: 'AVAILABLE', disabled: this._isCreateAction() }],
      createdAt: [this._isCreateAction() ? Date.now() : '']
    });
  }

  private _isCreateAction(): boolean {
    return this.data.action === EProductActions.create;
  }

  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
