import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/services/nav.service';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';


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
    public dialog: MatDialog
    ) {}

    openDialog() {
      this.dialog.open(CreateDialogComponent, {});
    }

  ngOnInit() {
    this.nav.hide();
  }
}
