import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private location: Location, private seoService: SeoService) {
    this.seoService.setTitleAndMeta('お探しのページが見つかりません');
  }

  goBack(): void {
    this.location.back();
  }
}
