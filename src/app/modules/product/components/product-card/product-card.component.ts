import { Component, Input, OnInit } from '@angular/core';
import {
  ECardCTA,
  IProduct,
  IProductCTA
} from '../../models/product.interface';
import { ProductCardService } from '../../services/product-card.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  @Input() ctaList: IProductCTA[];
  constructor(private _productCardService: ProductCardService) {}

  ngOnInit(): void {}

  callToAction(action: ECardCTA): void {
    switch (action) {
      case ECardCTA.view_detail:
        this._productCardService.navigateProductDetail(
          this.product.id.toString()
        );
        break;
      default:
        throw new Error('undefined event action');
    }
  }
}
