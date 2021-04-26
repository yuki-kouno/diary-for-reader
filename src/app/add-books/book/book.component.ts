import { Component, OnInit, Input } from '@angular/core';
import { NewReleaseInfo } from 'src/app/interface/new-release-info';
import { AmazonService } from 'src/app/services/amazon.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: NewReleaseInfo;

  constructor(public amazonService: AmazonService) {}

  ngOnInit(): void {}
}
