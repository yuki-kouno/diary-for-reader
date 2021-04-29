import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { Book } from 'src/app/interface/book';
import { rubberBandAnimation } from 'angular-animations';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [rubberBandAnimation()],
})
export class BookListComponent implements OnInit {
  @Input() book: Book;
  @Input() isFirst;

  user$: Observable<User> = this.userService.user$;
  animState: boolean;

  constructor(
    private dialog: MatDialog,
    private booksService: DatabaseBooksService,
    private userService: UserService
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

  animDone() {
    setTimeout(() => {
      this.animState = !this.animState;
    }, 500);
  }

  ngOnInit(): void {}
}
