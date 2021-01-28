import { Component, OnInit, Input } from '@angular/core';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  orderBy = 'latest';
  booksToNew$: Observable<Book[]> = this.databaseBooks.getToFavoriteBooks(
    'createdAt',
    'desc'
  );
  booksToOld$: Observable<Book[]> = this.databaseBooks.getToFavoriteBooks(
    'createdAt',
    'asc'
  );
  booksByAuthors$: Observable<Book[]> = this.databaseBooks.getToFavoriteBooks(
    'volumeInfo.authors',
    'desc'
  );

  constructor(
    private databaseBooks: DatabaseBooksService,
    private seoService: SeoService
  ) {
    this.seoService.setTitleAndMeta('ライブラリー');
  }

  ngOnInit() {}
}
