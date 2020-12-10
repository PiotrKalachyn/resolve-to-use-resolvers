import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserForm } from '../user-form';
import { User } from '../user';
import { UserFormService } from '../user-form.service';
import { UsersService } from '../users.service';
import { UserDialogService } from '../../shared/user-dialog.service';
import { SpinnersService } from '../../shared/spinners.service';
import { ModalDialogService } from '../../shared/modal-dialog.service';

@Component({
  selector: 'app-user-get-edit',
  templateUrl: './user-get-edit.component.html',
  styleUrls: ['./user-get-edit.component.css']
})
export class UserGetEditComponent implements OnInit {
  userId: number;
  userForm: UserForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userFormService: UserFormService,
    private usersService: UsersService,
    private dialog: UserDialogService,
    private spinner: SpinnersService,
    private modalDialog: ModalDialogService,
  ) { }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.params?.userId) || null;
    if (this.userId){
      this.userForm = this.userFormService.buildUserForm(16);
      this.getUser();
    }
    else {
      this.modalDialog.showError("No numeric user id specified");
      this.goAway();
    }
  }

  update() {
    const subscription = this.usersService
      .updateUser(this.userForm.value)
      .pipe(finalize(() => this.spinner.recheck()))
      .subscribe(
        () => this.dialog.notify("User updated"),
        error => this.modalDialog.showError(error)
      );
    this.spinner.add(subscription, `Saving user ${this.userId}`);
  }

  private getUser() {
    const subscription = this.usersService.getUser(this.userId)
      .pipe(finalize(() => this.spinner.recheck()))
      .subscribe(
        (user: User) =>
          this.userForm.patchValue(user)
        ,
        (error: any) => {
          this.modalDialog.showError(error);
          this.goAway();
        }
      );
    this.spinner.add(subscription, `Loading user ${this.userId}`);  
  }

  private goAway() {
    this.router.navigate(['../../'], { relativeTo: this.route});
  }
}