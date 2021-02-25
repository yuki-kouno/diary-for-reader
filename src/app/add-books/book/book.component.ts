import { Component, OnInit, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NewReleaseInfo } from 'src/app/interface/new-release-info';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: NewReleaseInfo;

  constructor(private seoService: SeoService, private meta: Meta) {
    this.seoService.setTitleAndMeta('本を追加');
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
  }

  ngOnInit(): void {}
}
