import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavService } from 'src/app/services/nav.service';
import { DialogChoiceBookComponent } from '../dialog-choice-book/dialog-choice-book.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  nowDate: Date;

  constructor(
    private datePipe: DatePipe,
    private nav: NavService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(DialogChoiceBookComponent, {

    });
  }

  ngOnInit(): void {
    this.nowDate = new Date();
    this.nav.show();
  }
}
