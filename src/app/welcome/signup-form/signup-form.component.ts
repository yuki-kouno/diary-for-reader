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
    private auth: AuthService,
    private router: Router
    ) {}

  signUp() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.auth.signUp(email, password).then(x => {
      this.router.navigate(['/review']);
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  submit() {
    console.log(this.signUpForm.value);
  }

  ngOnInit() {}
}
