import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
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
    private authService: AuthService,
    private router: Router
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  signUp() {
    this.authService.createUser(this.signUpForm.value);
  }

  ngOnInit() {}
}
