import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ModalDialogService } from '../shared/modal-dialog.service';
import { SpinnersService } from '../shared/spinners.service';
import { User } from './user';
import { UsersService } from './users.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private usersService: UsersService, private modalDialog: ModalDialogService, private spinner: SpinnersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = Number(route?.params?.userId) || null;

    if (!userId) {
      this.modalDialog.showError('No user id specified');
      return EMPTY;
    }

    const spinnerSubscription = this.spinner.spin(`Loading user (id: ${userId})...`);
    return this.usersService.getUser(userId).pipe(
      finalize(() => this.spinner.remove(spinnerSubscription)),
      catchError(error => {
      this.modalDialog.showError(error);
      return throwError(error);
    }));
  }
}
