import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  private _openSnackBar(message: string, panelClass?: string): void {
    this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass
    });
  }

  show(message: string): void {
    this._openSnackBar(message);
  }

  showSuccess(message: string): void {
    this._openSnackBar(message, 'bg-success');
  }

  showError(message: string): void {
    this._openSnackBar(message, 'bg-danger');
  }
}
