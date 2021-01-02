import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Review } from 'src/app/interface/review';
import { FormControl } from '@angular/forms';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { Book } from 'src/app/interface/book';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RemoveReviewDialogComponent } from '../remove-review-dialog/remove-review-dialog.component';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {
  @Input() review: Review;
  @Input() book: Book;
  @Input() isDate: boolean;
  editForm = new FormControl();
  isEditable = false;

  constructor(
    private databaseReviewsService: DatabaseReviewsService,
    private snackBer: MatSnackBar,
    public dialog: MatDialog
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.isEditable) {
      return;
    } else if (this.editForm.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }

  isEditMode() {
    this.isEditable = true;
    this.editForm.setValue(this.review.answer);
  }

  updataReview() {
    this.databaseReviewsService
      .updateReview(this.book, {
        id: this.review.id,
        answer: this.editForm.value,
      })
      .then(() => {
        this.snackBer.open('編集内容を保存しました。');
      });
  }

  openDialog(): void {
    this.dialog
      .open(RemoveReviewDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.databaseReviewsService
            .deleteReview(this.book, this.review)
            .then(() => {
              this.snackBer.open('削除しました。');
            });
        }
      });
  }

  ngOnInit(): void {}
}
