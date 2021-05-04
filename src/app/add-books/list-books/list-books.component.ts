import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { Meta } from '@angular/platform-browser';
import { rubberBandAnimation } from 'angular-animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
  animations: [rubberBandAnimation()],
})
export class ListBooksComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: Subscription;
  searchText: string;
  bookData$: Observable<Book[]> = this.route.paramMap.pipe(
    switchMap((param) => {
      this.searchText = param.get('searchText');
      return this.googleBooksApi.getListOfBooks(this.searchText);
    })
  );
  isBook$: Observable<Book[]> = this.databaseBooks.checkFavoriteBookExists();
  bookData: Book[];
  myfavoriteBookIds: string[];
  isAddedBook = [];
  animState: boolean;

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService,
    public loadingService: LoadingService,
    public userService: UserService,
    private meta: Meta
  ) {
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
    this.loadingService.loading = true;

    this.databaseBooks
      .getFavoriteBookIds()
      .pipe(take(1))
      .subscribe((bookIds) => (this.myfavoriteBookIds = bookIds));
  }

  ngOnInit() {
    this.subscriptions = this.bookData$
      .pipe(
        map((datas) => {
          if (datas?.length) {
            return datas.map((data) => {
              if (data.id) {
                return {
                  ...data,
                  isFavorite: this.myfavoriteBookIds?.includes(data.id),
                };
              } else {
                return;
              }
            });
          }
        })
      )
      .subscribe((datas: Book[]) => {
        this.loadingService.loading = false;
        this.bookData = datas;
      });
  }

  ngAfterViewInit() {
    this.shuffleList();
  }

  createBook(book: Book) {
    this.databaseBooks.createFavoriteBook(book);
    this.isAddedBook.push(book.id);
  }

  shuffleList() {
    const list = document.querySelectorAll('#randomList li');
    const box = [];
    list.forEach((el) => box.push(el));
    for (let i = box.length; 1 < i; i--) {
      const shuffleNumber = Math.floor(Math.random() * i);
      [box[shuffleNumber], box[i - 1]] = [box[i - 1], box[shuffleNumber]];
    }
    box.forEach((item) => document.querySelector('#randomList').append(item));
  }

  animDone() {
    setTimeout(() => {
      this.animState = !this.animState;
    }, 500);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
