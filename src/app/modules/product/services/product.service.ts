import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.interface';
import { Observable, of } from 'rxjs';
import { IRepository } from 'src/app/models/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _endpoint: typeof environment.endpoint;

  constructor(private _http: HttpClient) {
    this._endpoint = environment.endpoint;
  }

  getProducts(options?): Observable<IProduct[]> {
    return this._http
      .get<IProduct[]>(this._endpoint.products)
      .pipe(delay(2000));
  }

  getProduct(id: string): Observable<IProduct> {
    return this._http
      .get<IProduct>(this._endpoint.product.replace('{product_id}', id))
      .pipe(delay(2000));
  }
}
