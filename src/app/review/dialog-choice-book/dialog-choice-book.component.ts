import { Component, OnInit } from '@angular/core';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-dialog-choice-book',
  templateUrl: './dialog-choice-book.component.html',
  styleUrls: ['./dialog-choice-book.component.scss']
})
export class DialogChoiceBookComponent implements OnInit {


  constructor() {}


  ngOnInit() {}
}
