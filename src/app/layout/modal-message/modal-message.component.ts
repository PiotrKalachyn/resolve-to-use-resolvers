import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ModalDialogService } from "../../shared/modal-dialog.service";
import { ModalMessage } from "../../shared/modal-message";

@Component({
  selector: "tdpk-modal-message",
  templateUrl: "./modal-message.component.html",
  styleUrls: ["./modal-message.component.css"]
})
export class ModalMessageComponent implements OnInit {
  modalMessages: ModalMessage[] = [];

  constructor(private modalDialog: ModalDialogService) {}

  ngOnInit() {
    this.modalDialog
      .getModalMessage()
      .subscribe(modalMessage => this.modalMessages.push(modalMessage));
  }

  clicked() {
    this.modalMessages.shift();
  }
}
