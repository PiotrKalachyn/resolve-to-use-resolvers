import { FormControl, FormGroup } from "@angular/forms";

export interface UserForm extends FormGroup {
  controls: {
    name: FormControl;
    email: FormControl;
    birthYear: FormControl;
    id: FormControl; // to hold data
  };
}
