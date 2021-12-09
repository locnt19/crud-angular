import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  setLoading(state: boolean) {
    this._loading$.next(state);
  }
}
