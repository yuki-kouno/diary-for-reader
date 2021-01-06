import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss'],
})
export class LibrarySearchComponent implements OnInit {
  searchForm = new FormControl();

  constructor(private router: Router) {}

  back() {
    history.back();
  }

  async searchBook() {
    await this.router.navigate(['library-search', this.searchForm.value]);
    await location.reload();
  }

  ngOnInit(): void {}
}
