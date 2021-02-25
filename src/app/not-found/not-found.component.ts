import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SeoService } from '../services/seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(
    private location: Location,
    private seoService: SeoService,
    private meta: Meta
  ) {
    this.seoService.setTitleAndMeta('お探しのページが見つかりません');
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
  }

  goBack(): void {
    this.location.back();
  }
}
