import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserGetEditComponent } from "./user-get-edit/user-get-edit.component";
import { UserMessagesComponent } from "./user-messages/user-messages.component";
import { UserResolveEditComponent } from "./user-resolve-edit/user-resolve-edit.component";
import { UserResolver } from "./user.resolver";
import { UsersComponent } from "./users/users.component";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UsersComponent,
        pathMatch: "full"
      },
      { path: "add", component: UserAddComponent },
      { path: "get-edit/:userId", component: UserGetEditComponent },
      {
        path: "resolve-edit/:userId",
        resolve: { user: UserResolver },
        children: [
          {
            path: "",
            pathMatch: "full",
            component: UserResolveEditComponent
          },
          {
            path: "messages",
            component: UserMessagesComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
