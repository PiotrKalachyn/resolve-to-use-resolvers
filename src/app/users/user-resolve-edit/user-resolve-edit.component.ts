import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ModalDialogService } from '../../shared/modal-dialog.service';
import { SpinnersService } from '../../shared/spinners.service';
import { UserDialogService } from '../../shared/user-dialog.service';
import { User } from '../user';
import { UserForm } from '../user-form';
import { UserFormService } from '../user-form.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-resolve-edit',
  templateUrl: './user-resolve-edit.component.html',
  styleUrls: ['./user-resolve-edit.component.css']
})
export class UserResolveEditComponent implements OnInit {
  user: User;
  userForm: UserForm;
  loading = false;
  message = "";

  constructor(
    private route: ActivatedRoute,
    private userFormService: UserFormService,
    private usersService: UsersService,
    private dialog: UserDialogService,
    private spinner: SpinnersService,
    private modalDialog: ModalDialogService,

  ) { }

  ngOnInit() {
    this.user = this.route.snapshot?.data?.user;
    this.userForm = this.userFormService.buildUserForm(16);
    this.populateForm();
  }

  update() {
    const subscription = this.usersService
      .updateUser(this.userForm.value)
      .pipe(finalize(() => this.spinner.recheck()))
      .subscribe(
        () => this.dialog.notify( "User updated"),
        error => this.modalDialog.showError(error)
      );
    this.spinner.add(subscription, `Saving user ${this.user.id}`)
  }

  private populateForm() {
    this.userForm.patchValue(this.user);
  }
}