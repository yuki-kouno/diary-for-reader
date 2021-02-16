import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
})
export class QuestionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addQuestion() {}
}
