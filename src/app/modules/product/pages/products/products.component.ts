import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';
import {
  EProductAction,
  IProduct,
  IProductCardAction,
  IProductRepositoryOption,
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
  private _ctaAddProduct$: Subject<void>;
  products: IProduct[];
  productForm: FormGroup;
  productCardActions: IProductCardAction[];
  totalProductCount: number;
  repositoryOption: IProductRepositoryOption;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _matDialog: MatDialog
  ) {
    this._subscription$ = new Subscription();
    this._paginator$ = new Subject();
    this._debounceTime = 300;
    this._ctaAddProduct$ = new Subject();
    this.productCardActions = this._setProductCTA();
    this.productForm = this._initForm();
    this.repositoryOption = {
      _page: environment.paginate.page,
      _limit: environment.paginate.limit
    };
    this._listenPaginatorChange();
    this._listenCtaAddProduct();
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
      status: [null],
      search: ['']
    });
  }

  private _setProductCTA(): IProductCardAction[] {
    const cta = [
      {
        label: 'View',
        value: EProductAction.view_detail
      },
      {
        label: 'Update',
        value: EProductAction.update
      },
      {
        label: 'Delete',
        value: EProductAction.delete
      }
    ];

    return cta;
  }

  private _getProducts(option: IProductRepositoryOption): void {
    this._subscription$.add(
      this._productService.getProducts(option).subscribe(res => {
        this.totalProductCount = res.total;
        this.products = res.data;
      })
    );
  }

  private _createProduct(product: IProduct): void {
    this._subscription$.add(
      this._productService.createProduct(product).subscribe(res => {
        this._resetAndGetProducts(this.repositoryOption);
      })
    );
  }

  private _resetProducts(): void {
    this.products = [];
  }

  private _resetAndGetProducts(option: IProductRepositoryOption): void {
    this._resetProducts();
    this._getProducts(option);
  }

  private _openDialog(): void {
    const dialogRef = this._matDialog.open(ProductDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Create product',
        action: EProductAction.create,
        actionLabel: 'Create'
      }
    });

    this._subscription$.add(
      dialogRef.afterClosed().subscribe((data?: IProduct) => {
        if (data) {
          this._createProduct(data);
        }
      })
    );
  }

  private _listenPaginatorChange(): void {
    this._subscription$.add(
      this._paginator$
        .pipe(debounceTime(this._debounceTime))
        .subscribe(event => {
          this.repositoryOption._page = event.pageIndex + 1; // pageIndex start at 0
          this.repositoryOption._limit = event.pageSize;
          this._resetAndGetProducts(this.repositoryOption);
        })
    );
  }

  private _listenCtaAddProduct(): void {
    this._subscription$.add(
      this._ctaAddProduct$
        .pipe(debounceTime(this._debounceTime))
        .subscribe(() => this._openDialog())
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
          this._resetAndGetProducts(this.repositoryOption);
        })
    );
  }

  private _listenFormControlStatusChange(): void {
    this._subscription$.add(
      this.productForm
        .get('status')
        .valueChanges.pipe(debounceTime(this._debounceTime))
        .subscribe((value?: TProductStatus) => {
          this.repositoryOption.status = value;
          this._resetAndGetProducts(this.repositoryOption);
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
          this._resetAndGetProducts(this.repositoryOption);
        })
    );
  }

  paginatorChange(event: PageEvent): void {
    this._paginator$.next(event);
  }

  ctaAddProduct(): void {
    this._ctaAddProduct$.next();
  }
}
