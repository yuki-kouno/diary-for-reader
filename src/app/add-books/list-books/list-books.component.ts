import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { map } from 'rxjs/operators';
<<<<<<< Updated upstream
import { observable } from 'rxjs';
=======
>>>>>>> Stashed changes

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {
  // tslint:disable-next-line: no-string-literal
  searchText = this.activatedRoute.snapshot.params['searchText'];
  bookData: any = {};

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private databaseBooks: DatabaseBooksService
  ) {}

  ngOnInit() {
    this.googleBooksApi
      .getListOfBooks(this.searchText)
      .pipe(
        map((datas) => {
<<<<<<< Updated upstream
          return datas.filter((data) => data.volumeInfo.imageLinks);
=======
          return datas
            .filter(data => data.volumeInfo.imageLinks);
>>>>>>> Stashed changes
        })
      )
      .subscribe((datas: {}) => {
        this.bookData = datas;
        console.log(this.bookData);
      });
  }

  addToFavoliteBook(data) {
    this.databaseBooks.addToFavoriteBook(data);
  }
}
