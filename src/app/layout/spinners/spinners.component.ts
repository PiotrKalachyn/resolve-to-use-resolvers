import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PendingSubscription } from "../../shared/pending-subscription";
import { SpinnersService } from "../../shared/spinners.service";

@Component({
  selector: "tdpk-spinners",
  templateUrl: "./spinners.component.html",
  styleUrls: ["./spinners.component.css"]
})
export class SpinnersComponent implements OnInit {
  pendingSubscriptions$: Observable<PendingSubscription[]>;
  constructor(private spinners: SpinnersService) {}

  ngOnInit() {
    this.pendingSubscriptions$ = this.spinners.getAll();
  }
}
