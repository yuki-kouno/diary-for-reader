import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailControl() {
    return this.signUpForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.signUpForm.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  signUp() {
    this.userService.createUser(this.signUpForm.value);
  }

  ngOnInit() {}
}
