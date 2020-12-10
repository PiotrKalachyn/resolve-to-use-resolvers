import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelloComponent } from "./hello.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HelloComponent
  },
  {
    path: "users",
    loadChildren: () => import("./users/users.module").then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: "always",
      relativeLinkResolution: "corrected"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
