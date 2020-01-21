import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NavService } from 'src/app/services/nav.service';


export interface DialogData {

  name: string;
}

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {


  constructor(private nav: NavService) {}

  ngOnInit() {
    this.nav.hide();
  }
}
