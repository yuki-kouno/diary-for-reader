import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

const regex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/;

export class CustomValidators {
  static password(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return regex.test(control.value) ? null : { password: true };
  }
}

function isEmptyInputValue(val: any): boolean {
  return val == null || val.length === 0;
}
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  hide = true;
  passowrdLength = 10;
  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passowrdLength),
        CustomValidators.password,
      ],
    ],
  });

  get emailControl(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  signUp() {
    this.authService.createUser(this.signUpForm.value);
  }

  ngOnInit() {}
}
