import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {
  bookData: { book?: Book } = {};
  searchText: string;

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((param) => {
          this.searchText = param.get('searchText');
          return this.googleBooksApi.getListOfBooks(this.searchText);
        }),
        map((datas) => {
          return datas.filter((data) => data.volumeInfo.imageLinks);
        })
      )
      .subscribe((datas: {}) => {
        this.bookData = datas;
        console.log(this.bookData);
      });
  }

  createBook(book: Book) {
    this.databaseBooks.createToFavoriteBook(book);
  }
}
