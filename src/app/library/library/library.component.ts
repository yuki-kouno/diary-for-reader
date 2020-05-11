import { Component, OnInit } from '@angular/core';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  books$: Observable<Book[]> = this.databaseBooks.getToFavoriteBook();

  constructor(private databaseBooks: DatabaseBooksService) {}

  ngOnInit() {}
}
