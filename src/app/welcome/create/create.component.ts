import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  signUpDialog() {
    this.dialog.open(SignupFormComponent, {});
  }

  logInDialog() {
    this.dialog.open(LoginFormComponent, {});
  }

  login() {
    this.authService.loginWithGoogle();
  }

  back() {
    history.back();
  }

  ngOnInit(): void {}
}
