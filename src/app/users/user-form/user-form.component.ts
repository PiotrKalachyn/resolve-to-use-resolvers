import { Component, OnInit, Optional } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { UserForm } from "../user-form";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  userForm: UserForm;
  constructor(@Optional() private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.userForm = this.controlContainer.control as UserForm;
  }
}
