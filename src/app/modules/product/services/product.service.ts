import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.interface';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _endpoint: typeof environment.endpoint;

  constructor(
    private _http: HttpClient,
    private _loadingService: LoadingService,
    private _notificationService: NotificationService
  ) {
    this._endpoint = environment.endpoint;
  }

  private _catchError(): Observable<never> {
    this._loadingService.setLoading(false);
    this._notificationService.showError('INTERNAL SERVER ERROR');

    return throwError(new Error('INTERNAL SERVER ERROR'));
  }

  getProducts(options?): Observable<IProduct[]> {
    this._loadingService.setLoading(true);

    return this._http.get<IProduct[]>(this._endpoint.products).pipe(
      catchError(() => this._catchError()),
      delay(1500),
      tap(() => this._loadingService.setLoading(false))
    );
  }

  getProduct(id: string): Observable<IProduct> {
    this._loadingService.setLoading(true);

    return this._http
      .get<IProduct>(this._endpoint.product.replace('{product_id}', id))
      .pipe(
        catchError(() => this._catchError()),
        delay(1500),
        tap(() => this._loadingService.setLoading(false))
      );
  }
}
