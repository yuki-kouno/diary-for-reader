import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss'],
})
export class LibrarySearchComponent implements OnInit {
  @Input() searchText: '';

  constructor(private router: Router) {}

  searchBook() {
    this.router.navigate(['library-search', this.searchText]);
  }

  ngOnInit(): void {}
}
