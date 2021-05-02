import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { Book } from 'src/app/interface/book';
import { rubberBandAnimation } from 'angular-animations';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [rubberBandAnimation({ delay: 500 })],
})
export class BookListComponent implements OnInit {
  @Input() book: Book;
  @Input() isFirst;

  user$: Observable<User> = this.userService.user$;
  animState: boolean;

  constructor(
    private dialog: MatDialog,
    private booksService: DatabaseBooksService,
    private userService: UserService,
    private router: Router
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
    this.animState = !this.animState;
  }

  linkReview(user: User) {
    if (user.firstTour) {
      const value = { firstTour: false };
      this.userService.updateUserTour(value);
    }
    this.router.navigate(['/review', this.book.id]);
  }

  ngOnInit(): void {}
}
