import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  logInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get emailControl() {
    return this.logInForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.logInForm.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  logIn() {
    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;
    this.auth.logIn(email, password).then(() => {
      this.router.navigate(['/review']);
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
