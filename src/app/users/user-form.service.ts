import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserForm } from "./user-form";

@Injectable()
export class UserFormService {
  constructor(private formBuilder: FormBuilder) {}

  buildUserForm(minAge: number): UserForm {
    const maxYear = this.highestAllowedBirthYear(minAge);
    return this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      birthYear: [maxYear, Validators.max(maxYear)],
      id: null
    }) as UserForm;
  }

  private highestAllowedBirthYear(minAge: number): number {
    const currentYear: number = new Date().getFullYear();
    return currentYear - minAge;
  }
}
