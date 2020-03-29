import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private aushService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(SignupFormComponent, {});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  googleLogin() {
    this.aushService.googleLogin();
  }

  logIn(email, password) {
    this.aushService.logIn(email, password);
  }

  signUp(email, password) {
    this.aushService.signUp(email, password);
  }
}
