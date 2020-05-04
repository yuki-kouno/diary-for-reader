import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Book } from '../interface/book';
import { retry, catchError, windowCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksApiService {
  apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getListOfBooks(searchText): Observable<Book[]> {
    return this.http
      .get<Book[]>(this.apiUrl + '?q=' + searchText + '&maxResults=40')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Specific Book based on ID
  getSpecificBook(id): Observable<Book> {
    return this.http
      .get<Book>(this.apiUrl + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get Client-Side Error
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
