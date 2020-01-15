import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog.component';

export interface DialogData {

  name: string;
}

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(WelcomeDialogComponent, {
      width: '300px',
      height: '350px',
      data: { name: this.name}
    });

  }
  ngOnInit
}
