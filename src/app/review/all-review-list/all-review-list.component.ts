import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { Review } from 'src/app/interface/review';
import { Book } from 'src/app/interface/book';
import { FormControl } from '@angular/forms';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RemoveReviewDialogComponent } from '../remove-review-dialog/remove-review-dialog.component';

@Component({
  selector: 'app-all-review-list',
  templateUrl: './all-review-list.component.html',
  styleUrls: ['./all-review-list.component.scss'],
})
export class AllReviewListComponent implements OnInit {
  @Input() review: Review;
  @Input() book: Book;
  @Output() event = new EventEmitter();

  editForm: FormControl = new FormControl();
  isEditable = false;

  constructor(
    private databaseReviewsService: DatabaseReviewsService,
    private snackBer: MatSnackBar,
    private dialog: MatDialog
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
    this.event.emit(+1);
  }

  cancelEdit() {
    this.isEditable = false;
    this.event.emit(-1);
    this.editForm.reset();
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
    this.event.emit(-1);
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
