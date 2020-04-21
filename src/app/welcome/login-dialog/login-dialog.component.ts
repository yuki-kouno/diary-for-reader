import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  signUpDialog() {
    this.dialog.open(SignupFormComponent, {});
  }

  logInDialog() {
    this.dialog.open(LoginFormComponent, {});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  googleLogin() {
    this.authService.googleLogin();
  }


  login() {
    this.authService.login(this.form.value);
  }

  logout() {
    this.authService.logout();
  }

  resetPassword() {
    this.authService.resetPassword(this.form.value.email);
  }

}
