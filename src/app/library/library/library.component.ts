import { Component, OnInit } from '@angular/core';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';
import { SeoService } from 'src/app/services/seo.service';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  orderBy = 'latest';
  booksToNew$: Observable<Book[]> = this.databaseBooks
    .getToFavoriteBooks('createdAt', 'desc')
    .pipe(tap(() => (this.loadingService.loading = false)));
  booksToOld$: Observable<Book[]> = this.databaseBooks
    .getToFavoriteBooks('createdAt', 'asc')
    .pipe(tap(() => (this.loadingService.loading = false)));
  booksByAuthors$: Observable<Book[]> = this.databaseBooks
    .getToFavoriteBooks('volumeInfo.authors', 'desc')
    .pipe(tap(() => (this.loadingService.loading = false)));

  constructor(
    private databaseBooks: DatabaseBooksService,
    private seoService: SeoService,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.seoService.setTitleAndMeta('ライブラリー');
  }

  ngOnInit() {}
}
