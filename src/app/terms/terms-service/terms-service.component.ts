import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss'],
})
export class TermsServiceComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.setTitleAndMeta('利用規約');
  }

  close() {
    history.back();
  }
  ngOnInit(): void {}
}
