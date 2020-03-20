import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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

  closeDialog() {
    this.dialog.closeAll();
  }

  login() {
    this.aushService.login();
  }
}
