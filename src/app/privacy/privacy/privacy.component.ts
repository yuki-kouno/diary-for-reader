import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  constructor(private seoService: SeoService, private meta: Meta) {
    this.seoService.setTitleAndMeta('プライバシーポリシー');
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
