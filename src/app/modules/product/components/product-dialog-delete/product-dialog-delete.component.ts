import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../../models/product.interface';

@Component({
  selector: 'app-product-dialog-delete',
  templateUrl: './product-dialog-delete.component.html',
  styleUrls: ['./product-dialog-delete.component.scss']
})
export class ProductDialogDeleteComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private dialogRef: MatDialogRef<ProductDialogDeleteComponent>
  ) {}

  ngOnInit(): void {}

  yes(): void {
    this.dialogRef.close(true);
  }
}
