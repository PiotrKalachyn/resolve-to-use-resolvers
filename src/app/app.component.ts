import { Component, VERSION } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Timely Data Handling in Angular " + VERSION.major;
}
