import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading$: BehaviorSubject<boolean>;

  constructor() {
    this._loading$ = new BehaviorSubject<boolean>(false);
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  setLoading(state: boolean): void {
    this._loading$.next(state);
  }
}
