import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private dialog: MatDialog,
    private booksService: DatabaseBooksService
  ) {}

  openRemoveDialog(book) {
    this.dialog
      .open(RemoveDialogComponent)
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.booksService.removeFavoriteBook(book.id);
        }
      });
  }

  ngOnInit(): void {}
}
