import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { ModalDialogService } from "../../shared/modal-dialog.service";
import { SpinnersService } from "../../shared/spinners.service";
import { UserDialogService } from "../../shared/user-dialog.service";
import { UserForm } from "../user-form";
import { UserFormService } from "../user-form.service";
import { UsersService } from "../users.service";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.css"]
})
export class UserAddComponent implements OnInit {
  userForm: UserForm;
  constructor(
    private userFormService: UserFormService,
    private usersService: UsersService,
    private dialog: UserDialogService,
    private spinner: SpinnersService,
    private modalDialog: ModalDialogService
  ) {}

  ngOnInit() {
    this.userForm = this.userFormService.buildUserForm(16);
  }

  create() {
    const subscription = this.usersService
      .createUser(this.userForm.value)
      .pipe(finalize(() => this.spinner.recheck()))
      .subscribe(
        () => this.dialog.notify("User created"),
        error => this.modalDialog.showError(error)
      );
    this.spinner.add(subscription, "Creating user...");
  }
}
