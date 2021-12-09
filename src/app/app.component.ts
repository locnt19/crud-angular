import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  loading$: Observable<boolean>;

  constructor(
    private _loading: LoadingService,
    private _changeDetector: ChangeDetectorRef
  ) {
    this.loading$ = this._loading.loading$;
  }

  ngAfterViewChecked(): void {
    // FIXED ERROR: ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }
}
