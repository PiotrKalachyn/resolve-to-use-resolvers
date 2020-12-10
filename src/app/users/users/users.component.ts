import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ModalDialogService } from "../../shared/modal-dialog.service";
import { SpinnersService } from "../../shared/spinners.service";
import { User } from "../user";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(
    private usersService: UsersService,
    private spinner: SpinnersService,
    private modalDialog: ModalDialogService
  ) {}

  ngOnInit() {
    const loadingSpinner = this.spinner.spin("Loading users...");
    this.users$ = this.usersService.getUsers().pipe(
      tap(() => this.spinner.remove(loadingSpinner)),
      catchError(error => {
        this.modalDialog.showError(error);
        return throwError(error);
      })
    );
  }
}
