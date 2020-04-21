import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit {
  @Input() searchText: '';

  constructor(public router: Router) {}

  ngOnInit() {}

  searchBook() {
    this.router.navigate(['add-books', 'list-books', this.searchText]);
  }
}
