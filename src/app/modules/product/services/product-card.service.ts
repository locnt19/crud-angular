import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCardService {
  constructor(private _router: Router) {}

  navigateProductDetail(id: string): void {
    this._router.navigateByUrl(
      environment.route.productDetail.replace(':id', id)
    );
  }
}
