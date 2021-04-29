import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { rubberBandAnimation } from 'angular-animations';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';
import { LoadingService } from 'src/app/services/loading.service';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
  animations: [rubberBandAnimation()],
})
export class SearchBooksComponent implements OnInit {
  title = '本を追加';
  searchForm: FormControl = new FormControl('');
  animState: boolean;

  isBook$: Observable<Book[]> = this.databaseBooks.checkFavoriteBookExists();
  searchText: Observable<string> = this.route.paramMap.pipe(
    map((param) => param.get('searchText'))
  );

  constructor(
    private router: Router,
    private databaseBooks: DatabaseBooksService,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    public userService: UserService
  ) {}

  ngOnInit() {}

  searchBook(tour: boolean) {
    if (this.searchForm.value) {
      if (tour) {
        this.router.navigate(['add-books', this.searchForm.value], {
          queryParams: { tour: true },
        });
      } else {
        this.router.navigate(['add-books', this.searchForm.value]);
      }
    }
  }

  animDone() {
    setTimeout(() => {
      this.animState = !this.animState;
    }, 500);
  }
}
