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
      createdAt: [this._isCreateAction() ? today.toISOString() : '']
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
