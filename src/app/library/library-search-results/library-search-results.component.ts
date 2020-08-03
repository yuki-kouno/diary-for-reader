import { Component, OnInit } from '@angular/core';
import { SearchLibraryService } from 'src/app/services/search-library.service';
import { SearchIndex } from 'algoliasearch/lite';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-library-search-results',
  templateUrl: './library-search-results.component.html',
  styleUrls: ['./library-search-results.component.scss'],
})
export class LibrarySearchResultsComponent implements OnInit {
  index: SearchIndex = this.searchLibraryService.index.item;
  searchText: string;

  result: {
    nbHits: number;
    hits: any[];
  };

  constructor(
    private searchLibraryService: SearchLibraryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.searchText = param.get('searchText');
      this.index
        .search(this.searchText)
        .then((result) => (this.result = result));
    });
  }
}
