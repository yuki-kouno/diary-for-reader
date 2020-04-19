import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  // tslint:disable-next-line: no-string-literal
  searchText = this.activatedRoute.snapshot.params['searchText'];
  bookData: any = {};

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.googleBooksApi
      .getListOfBooks(this.searchText)
      .subscribe((data: {}) => {
        this.bookData = data;
      });
  }

  getBookDetails(id) {
    this.router.navigate(['/get-book/' + id]);
  }
}
