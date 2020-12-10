import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserDialogService } from "../../shared/user-dialog.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<string[]>;
  constructor(private dialog: UserDialogService) {}

  ngOnInit() {
    this.notifications$ = this.dialog.getNotifications();
  }
}
