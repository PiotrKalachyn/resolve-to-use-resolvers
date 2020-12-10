import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersService } from "./users.service";
import { UserFormService } from "./user-form.service";
import { UserFormComponent } from "./user-form/user-form.component";
import { UsersComponent } from "./users/users.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserGetEditComponent } from "./user-get-edit/user-get-edit.component";
import { UsersRoutingModule } from "./users-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserResolveEditComponent } from "./user-resolve-edit/user-resolve-edit.component";
import { UserResolver } from "./user.resolver";
import { SharedModule } from "../shared/shared.module";
import { UserMessagesComponent } from './user-messages/user-messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserAddComponent,
    UserGetEditComponent,
    UserResolveEditComponent,
    UserMessagesComponent
  ],
  providers: [UsersService, UserFormService, UserResolver]
})
export class UsersModule {}
