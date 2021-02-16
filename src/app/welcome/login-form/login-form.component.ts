import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetDialogComponent } from '../reset-dialog/reset-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  hide = true;
  logInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailControl(): FormControl {
    return this.logInForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.logInForm.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  logIn() {
    this.authService.loginWithtEmail(this.logInForm.value);
  }

  openResetDialog() {
    this.dialog.open(ResetDialogComponent);
  }
}
