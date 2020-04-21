import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';

@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrls: ['./get-book.component.scss']
})
export class GetBookComponent implements OnInit {
  id = this.activatedRoute.snapshot.params.id;
  bookData: any = {};

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
  }

}
