import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchLibraryService } from 'src/app/services/search-library.service';
import { SearchIndex } from 'algoliasearch/lite';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Book } from 'src/app/interface/book';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { SeoService } from 'src/app/services/seo.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-library-search-results',
  templateUrl: './library-search-results.component.html',
  styleUrls: ['./library-search-results.component.scss'],
})
export class LibrarySearchResultsComponent implements OnInit, OnDestroy {
  title = 'ライブラリ内検索';
  index: SearchIndex = this.searchLibraryService.index.item;
  searchText: string;
  uid: string = this.authService.uid;
  results: Book[];
  isResults: boolean;
  subscriptions: Subscription;

  constructor(
    private searchLibraryService: SearchLibraryService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private booksService: DatabaseBooksService,
    private seoService: SeoService,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.seoService.setTitleAndMeta(this.title);
  }

  openRemoveDialog(book, i) {
    const dialogRef = this.dialog
      .open(RemoveDialogComponent)
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.booksService.removeFavoriteBook(book.id);
          this.results.splice(i, 1);
        }
      });
  }

  ngOnInit() {
    this.subscriptions = this.route.paramMap.subscribe((param) => {
      this.searchText = param.get('searchText');
      this.index.search(this.searchText).then((datas) => {
        const hits: any = datas.hits;
        const list = hits.filter((hit) => hit.uid === this.uid);
        this.loadingService.loading = false;
        if (list.length > 0) {
          this.isResults = true;
          this.results = list;
        } else {
          this.isResults = false;
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
