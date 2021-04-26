import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit {
  title = '本を追加';
  searchForm: FormControl = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit() {}

  searchBook() {
    if (this.searchForm.value) {
      this.router.navigate(['add-books', this.searchForm.value]);
    }
  }
}
