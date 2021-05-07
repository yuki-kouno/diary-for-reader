import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  siteName = '読書家のための日記帳';
  defaultDescription = '質問に答えて簡単アウトプット';

  constructor(private titleService: Title, private meta: Meta) {}

  setTitleAndMeta(title?: string, description?: string) {
    const pageTitle = title ? title : this.siteName;
    // const pageDescription = description ? description : this.defaultDescription;
    // const metaList = [
    //   {
    //     name: 'description',
    //     content: pageDescription,
    //   },
    //   {
    //     property: 'og:site_name',
    //     content: this.siteName,
    //   },
    //   {
    //     property: 'og:title',
    //     content: pageTitle,
    //   },
    //   {
    //     property: 'og:description',
    //     content: pageDescription,
    //   },
    //   {
    //     property: 'og:url',
    //     content: location.href,
    //   },
    //   {
    //     property: 'og:image',
    //     content: location.href + 'assets/images/ogp-cover.png',
    //   },
    //   {
    //     name: 'twitter:card',
    //     content: 'Summary Card',
    //   },
    // ];

    this.titleService.setTitle(pageTitle);
    // metaList.forEach((meta) => {
    //   this.meta.updateTag(meta);
    // });
  }
}
