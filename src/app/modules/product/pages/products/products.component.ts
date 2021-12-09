import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import {
  ECardCTA,
  IProduct,
  IProductCTA
} from '../../models/product.interface';
import { IRepositoryOptions } from 'src/app/models/repository.interface';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscription$: Subscription;
  private _paginator$: Subject<PageEvent>;
  products: IProduct[];
  productCTA: IProductCTA[];
  totalProductCount: number;
  repositoryOption: IRepositoryOptions;

  constructor(private _productService: ProductService) {
    this._subscription$ = new Subscription();
    this._paginator$ = new Subject();
    this.productCTA = [
      {
        label: 'View',
        value: ECardCTA.view_detail
      },
      {
        label: 'Update',
        value: ECardCTA.update
      },
      {
        label: 'Delete',
        value: ECardCTA.delete
      }
    ];
    this.repositoryOption = {
      _sort: 'name',
      _page: environment.paginate.page,
      _limit: environment.paginate.limit
    };
    this._listenPaginatorChange();
  }

  ngOnInit(): void {
    this._getProducts(this.repositoryOption);
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _getProducts(option?: IRepositoryOptions) {
    this._subscription$.add(
      this._productService.getProducts(option).subscribe(res => {
        this.totalProductCount = res.total;
        this.products = res.data;
      })
    );
  }

  private _listenPaginatorChange(): void {
    this._subscription$.add(
      this._paginator$.pipe(debounceTime(300)).subscribe(event => {
        this.repositoryOption._page = event.pageIndex + 1; // pageIndex start at 0
        this.repositoryOption._limit = event.pageSize;
        this.products = [];

        this._getProducts(this.repositoryOption);
      })
    );
  }

  paginatorChange(event: PageEvent): void {
    this._paginator$.next(event);
  }
}
