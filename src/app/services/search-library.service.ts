import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchLibraryService {
  index = {
    item: searchClient.initIndex('favoriteBooks'),
  };

  constructor() {}
}
