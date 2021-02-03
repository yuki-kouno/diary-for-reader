import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss'],
})
export class ResetDialogComponent implements OnInit {
  emailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get emailControl(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  resetPassword() {
    this.authService.resetPassword(this.emailForm.value.email);
  }
}
