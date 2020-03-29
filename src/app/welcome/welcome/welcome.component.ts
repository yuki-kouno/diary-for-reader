import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/services/nav.service';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


export interface DialogData {

  name: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private nav: NavService,
    public dialog: MatDialog,
    private aushService: AuthService
  ) {}

  openDialog() {
    this.dialog.open(LoginDialogComponent, {});
  }

  ngOnInit() {
    this.nav.hide();
  }
}
