import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SeoService } from 'src/app/services/seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss'],
})
export class LibrarySearchComponent implements OnInit {
  searchForm: FormControl = new FormControl();

  constructor(
    private router: Router,
    private seoService: SeoService,
    private meta: Meta
  ) {
    this.seoService.setTitleAndMeta(this.searchForm.value);
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
  }

  back() {
    history.back();
  }

  searchBook() {
    this.router.navigate(['library-search', this.searchForm.value]);
  }

  ngOnInit(): void {}
}
