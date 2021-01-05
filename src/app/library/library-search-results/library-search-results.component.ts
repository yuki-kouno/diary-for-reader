import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { SearchLibraryService } from 'src/app/services/search-library.service';
import { SearchIndex } from 'algoliasearch/lite';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Book } from 'src/app/interface/book';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-library-search-results',
  templateUrl: './library-search-results.component.html',
  styleUrls: ['./library-search-results.component.scss'],
})
export class LibrarySearchResultsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  index: SearchIndex = this.searchLibraryService.index.item;
  searchText: string;
  uid = this.authService.uid;
  results: Book[];
  subscriptions;

  constructor(
    private searchLibraryService: SearchLibraryService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private booksService: DatabaseBooksService,
    private router: Router,
    private seoService: SeoService
  ) {
    this.seoService.setTitleAndMeta('ライブラリ内検索');
  }

  openRemoveDialog(book) {
    this.dialog
      .open(RemoveDialogComponent)
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.booksService.removeToFavoriteBook(book.id);
        }
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    console.log('init');
    this.subscriptions = this.route.paramMap.subscribe((param) => {
      this.searchText = param.get('searchText');
      this.index.search(this.searchText).then((datas) => {
        const hits: any = datas.hits;
        this.results = hits.filter((hit) => hit.uid === this.uid);
      });
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.background =
      'rgb(237, 245, 245)';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
