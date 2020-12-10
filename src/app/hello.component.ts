import { Component } from "@angular/core";

@Component({
  selector: "hello",
  template: `
    <p>
      <a [routerLink]="'users'">
        <i class="far fa-address-book"></i>
        Go to user management
      </a>
    </p>
  `
})
export class HelloComponent {}
