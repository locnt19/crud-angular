import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IRepository } from 'src/app/models/repository.interface';
import {
  IProduct,
  IProductRepositoryOptions
} from '../models/product.interface';

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

  getProducts(
    option?: IProductRepositoryOptions
  ): Observable<IRepository<IProduct>> {
    this._loadingService.setLoading(true);
    let httpParams = new HttpParams();

    if (option) {
      for (const key in option) {
        if (Object.prototype.hasOwnProperty.call(option, key)) {
          httpParams = httpParams.set(key, option[key]);
        }
      }
    }

    return this._http
      .get<IProduct[]>(this._endpoint.products, {
        params: httpParams,
        observe: 'response'
      })
      .pipe(
        catchError(() => this._catchError()),
        map((res: HttpResponse<IProduct[]>) => {
          return {
            total: parseInt(res.headers.get('X-Total-Count') ?? '0'),
            data: res.body ?? []
          };
        }),
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

  createProduct(product: IProduct): Observable<IProduct> {
    this._loadingService.setLoading(true);

    return this._http.post<IProduct>(this._endpoint.products, product).pipe(
      catchError(() => this._catchError()),
      delay(1500),
      tap(() => {
        this._loadingService.setLoading(false);
        this._notificationService.showSuccess('Create product successful');
      })
    );
  }
}
