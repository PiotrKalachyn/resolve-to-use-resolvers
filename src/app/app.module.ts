import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { NgxIndexedDBModule, NgxIndexedDBService } from "ngx-indexed-db";
import { DB_CONFIG } from "./db-config";
import { SharedModule } from "./shared/shared.module";
import { LayoutModule } from "./layout/layout.module";
import { UserDialogService } from "./shared/user-dialog.service";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(DB_CONFIG)
  ],
  declarations: [AppComponent, HelloComponent],
  providers: [UserDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
