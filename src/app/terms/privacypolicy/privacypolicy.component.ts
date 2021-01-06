import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss'],
})
export class PrivacypolicyComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.setTitleAndMeta('プライバシーポリシー');
  }

  close() {
    history.back();
  }

  ngOnInit(): void {}
}
