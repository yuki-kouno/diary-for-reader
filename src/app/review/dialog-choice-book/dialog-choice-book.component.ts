import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-choice-book',
  templateUrl: './dialog-choice-book.component.html',
  styleUrls: ['./dialog-choice-book.component.scss']
})
export class DialogChoiceBookComponent implements OnInit {


  constructor(private dialog: MatDialog) {}
  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnInit() {}
}
