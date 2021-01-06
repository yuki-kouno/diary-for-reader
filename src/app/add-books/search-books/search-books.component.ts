import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements AfterViewInit, OnInit {
  searchForm = new FormControl('');

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {}

  searchBook() {
    this.router.navigate(['add-books', this.searchForm.value]);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.background = `linear-gradient(
      217deg,
      rgba(242, 244, 245, 0.8),
      rgba(255, 255, 255, 0) 70.71%
    ),
    linear-gradient(
      127deg,
      rgba(244, 246, 247, 0.8),
      rgba(255, 255, 255, 0) 70.71%
    ),
    linear-gradient(
      336deg,
      rgba(238, 240, 241, 0.8),
      rgba(255, 255, 255, 0) 70.71%
    )`;
  }
}
