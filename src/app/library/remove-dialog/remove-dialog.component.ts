import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss'],
})
export class RemoveDialogComponent implements OnInit {
  constructor(
    private databaseBooks: DatabaseBooksService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  removeFavoriteBook(book: Book) {
    this.databaseBooks.removeFavoriteBook(book.bookId);
  }

  ngOnInit(): void {}
}
