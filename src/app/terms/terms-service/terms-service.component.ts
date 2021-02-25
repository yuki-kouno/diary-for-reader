import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss'],
})
export class TermsServiceComponent implements OnInit {
  constructor(private seoService: SeoService, private meta: Meta) {
    this.seoService.setTitleAndMeta('利用規約');
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
  }

  close() {
    history.back();
  }
  ngOnInit(): void {}
}
