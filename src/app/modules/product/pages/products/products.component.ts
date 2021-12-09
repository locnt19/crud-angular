import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ECardCTA,
  IProduct,
  IProductCTA,
  IProductRepositoryOptions,
  TProductStatus
} from '../../models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscription$: Subscription;
  private _paginator$: Subject<PageEvent>;
  private _debounceTime: number;
  products: IProduct[];
  productForm: FormGroup;
  productCTA: IProductCTA[];
  totalProductCount: number;
  repositoryOption: IProductRepositoryOptions;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService
  ) {
    this._subscription$ = new Subscription();
    this._paginator$ = new Subject();
    this._debounceTime = 350;
    this.productCTA = this._setProductCTA();
    this.productForm = this._initForm();
    this.repositoryOption = {
      _page: environment.paginate.page,
      _limit: environment.paginate.limit
    };
    this._listenPaginatorChange();
    this._listenFormControlCreatedAtChange();
    this._listenFormControlStatusChange();
    this._listenFormControlSearchChange();
  }

  ngOnInit(): void {
    this._getProducts(this.repositoryOption);
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  private _initForm(): FormGroup {
    return this._formBuilder.group({
      createdAt: [''],
      status: [''],
      search: ['']
    });
  }

  private _setProductCTA(): IProductCTA[] {
    const cta = [
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

    return cta;
  }

  private _getProducts(option?: IProductRepositoryOptions) {
    this._subscription$.add(
      this._productService.getProducts(option).subscribe(res => {
        this.totalProductCount = res.total;
        this.products = res.data;
      })
    );
  }

  private _resetProducts(): void {
    this.products = [];
  }

  private _listenPaginatorChange(): void {
    this._subscription$.add(
      this._paginator$
        .pipe(debounceTime(this._debounceTime))
        .subscribe(event => {
          this.repositoryOption._page = event.pageIndex + 1; // pageIndex start at 0
          this.repositoryOption._limit = event.pageSize;
          this._resetProducts();

          this._getProducts(this.repositoryOption);
        })
    );
  }

  private _listenFormControlCreatedAtChange(): void {
    this._subscription$.add(
      this.productForm
        .get('createdAt')
        .valueChanges.pipe(debounceTime(this._debounceTime))
        .subscribe((value: string) => {
          this.repositoryOption._sort = 'createdAt';
          this.repositoryOption._order = value;
          this._resetProducts();

          this._getProducts(this.repositoryOption);
        })
    );
  }

  private _listenFormControlStatusChange(): void {
    this._subscription$.add(
      this.productForm
        .get('status')
        .valueChanges.pipe(debounceTime(this._debounceTime))
        .subscribe((value: TProductStatus) => {
          this.repositoryOption.status = value;
          this._resetProducts();
          this._getProducts(this.repositoryOption);
        })
    );
  }

  private _listenFormControlSearchChange(): void {
    this._subscription$.add(
      this.productForm
        .get('search')
        .valueChanges.pipe(debounceTime(this._debounceTime))
        .subscribe((value: string) => {
          if (!value.trim()) return;

          this.repositoryOption.q = value;
          this._resetProducts();
          this._getProducts(this.repositoryOption);
        })
    );
  }

  paginatorChange(event: PageEvent): void {
    this._paginator$.next(event);
  }
}
