import { Component, OnInit, Input } from '@angular/core';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  books$: Observable<Book[]> = this.databaseBooks.getToFavoriteBooks();
  isGrid = true;

  constructor(
    private databaseBooks: DatabaseBooksService,
    public dialog: MatDialog
  ) {}

  openRemoveDialog(book) {
    this.dialog
      .open(RemoveDialogComponent)
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.databaseBooks.removeToFavoriteBook(book.id);
        }
      });
  }

  ngOnInit() {}
}
