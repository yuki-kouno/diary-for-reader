import { Component, OnInit } from '@angular/core';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  title = 'ライブラリー';
  bookDatas: {
    data: Observable<Book[]>;
    title: string;
  }[] = [
    {
      data: this.databaseBooks
        .getFavoriteBooks('createdAt', 'desc')
        .pipe(tap(() => (this.loadingService.loading = false))),
      title: '追加日の新しい順',
    },
    {
      data: this.databaseBooks.getFavoriteBooks('createdAt', 'asc'),
      title: '追加日の古い順',
    },
    {
      data: this.databaseBooks.getFavoriteBooks('volumeInfo.authors', 'desc'),
      title: '著者の名前順',
    },
  ];
  books$ = this.bookDatas[0].data;

  constructor(
    private databaseBooks: DatabaseBooksService,
    private seoService: SeoService,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.seoService.setTitleAndMeta(this.title);
  }

  ngOnInit() {}
}
