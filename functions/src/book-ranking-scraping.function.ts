import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer-core';
import * as admin from 'firebase-admin';

admin.initializeApp();
export const db = admin.firestore();

const rankingUrls: {
  name: string;
  url: string;
}[] = [
  {
    name: 'new',
    url: 'https://www.amazon.co.jp/gp/bestsellers/books/4915091051',
  }, // 来週リリース
  {
    name: 'overall',
    url:
      'https://www.amazon.co.jp/gp/bestsellers/books/?ref=snv_ranking_allbook',
  }, // 総合
  {
    name: 'hobby',
    url:
      'https://www.amazon.co.jp/gp/bestsellers/books/4852983051?ref=snv_ranking_hobby',
  }, // 趣味・実用
  {
    name: 'comic',
    url:
      'https://www.amazon.co.jp/gp/bestsellers/books/5326865051?ref=snv_ranking_comic',
  }, // コミック・ラノベ
  {
    name: 'business',
    url:
      'https://www.amazon.co.jp/gp/bestsellers/books/4852973051?ref=snv_ranking_business',
  }, // ビジネス・経済
  {
    name: 'humanity',
    url:
      'https://www.amazon.co.jp/gp/bestsellers/books/4852966051?ref=snv_ranking_jinbun',
  }, // 人文・思想
  {
    name: 'literature',
    url:
      'https://www.amazon.co.jp/gp/bestsellers/books/4852944051?ref=snv_ranking_bungaku',
  }, // 文学・評論
];

const newReleaseUrls: {
  name: string;
  url: string;
}[] = [
  {
    name: 'it',
    url:
      'https://www.amazon.co.jp/s?bbn=465610&rh=n%3A465392%2Cn%3A%21465610%2Cn%3A466298&__mk_ja_JP=%EF%BF%BDJ%EF%BF%BD%5E%EF%BF%BDJ%EF%BF%BDi&field-publication_date=2285541051&pf_rd_i=2405051051&pf_rd_m=A3P5ROKL5A1OLE&pf_rd_p=8292f228-2c76-47cb-9759-445fcd0e1bf8&pf_rd_r=M8RT8QQEB3K3WZVZC3BW&pf_rd_s=merchandised-search-6&pf_rd_t=101&ref=s9_acsd_hps_bw_c2_x_c2cl',
  }, // コンピュータ・IT
  {
    name: 'comic',
    url:
      'https://www.amazon.co.jp/s?i=stripbooks&bbn=2278488051&rh=n%3A465392%2Cn%3A%21465610%2Cn%3A466280%2Cn%3A2278488051%2Cp_6%3AAN1VRQENFRJN5%2Cp_n_publication_date%3A2285541051&ref=snv_new_comic',
  }, // コミック
  {
    name: 'life',
    url:
      'https://www.amazon.co.jp/s?i=stripbooks&bbn=465610&rh=n%3A465392%2Cn%3A%21465610%2Cn%3A466304%2Cp_n_publication_date%3A2285541051&ref=snv_new_life',
  }, // くらし子育て
  {
    name: 'literature',
    url:
      'https://www.amazon.co.jp/s?bbn=465610&rh=n%3A465392%2Cn%3A%21465610%2Cn%3A466284&__mk_ja_JP=%EF%BF%BDJ%EF%BF%BD%5E%EF%BF%BDJ%EF%BF%BDi&field-publication_date=2285541051&pf_rd_i=2405051051&pf_rd_m=A3P5ROKL5A1OLE&pf_rd_p=c56edb9d-3ce5-40c0-b120-a3c10a350270&pf_rd_r=E2760F7HQG70Y0JQN63J&pf_rd_s=merchandised-search-8&pf_rd_t=101&ref=s9_acsd_hps_bw_c2_x_c2cl',
  }, // 文学・評論
  {
    name: 'business',
    url:
      'https://www.amazon.co.jp/s?bbn=465610&rh=n%3A465392%2Cn%3A%21465610%2Cn%3A466282%2Cp_n_publication_date%3A2285541051&pf_rd_i=2405051051&pf_rd_m=AN1VRQENFRJN5&pf_rd_p=5e8937b0-abff-482c-993d-3f11aaf16627&pf_rd_p=5e8937b0-abff-482c-993d-3f11aaf16627&pf_rd_r=7KW2BSPRVX036BTHZ3HB&pf_rd_r=7KW2BSPRVX036BTHZ3HB&pf_rd_s=merchandised-search-left-2&pf_rd_t=101&ref=amb_link_10',
  }, // ビジネス・経済
  {
    name: 'lightnovel',
    url:
      'https://www.amazon.co.jp/s?bbn=467278&rh=n%3A467278%2Cp_n_publication_date%3A2285541051&dc&qid=1617936013&rnid=82836051&ref=lp_467278_nr_p_n_publication_date_2',
  }, // ラノベ
];

const scrapeRelease = async (url: string, name: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const imgSelector = '.s-image-fixed-height .s-image';
  const titleSelector = '.a-size-medium';
  const authorSelector = '.a-color-secondary > .a-size-base:nth-child(2)';
  const linkSelector = 'h2.a-size-mini > a';

  const getTitle = await page.evaluate((selector) => {
    const list = [...document.querySelectorAll(selector)].map(
      (el) => el.innerText
    );
    const Datas = [];
    const numberOfRankings = 16;
    for (let i = 0; i < numberOfRankings; i++) {
      const listData = {
        title: list[i],
      };
      Datas.push(listData);
    }
    return Datas;
  }, titleSelector);

  const getimage = await page.evaluate((selector) => {
    const list = [...document.querySelectorAll(selector)];
    const Datas = [];
    const numberOfRankings = 16;
    for (let i = 0; i < numberOfRankings; i++) {
      const Data = {
        src: list
          .map((el) => el.getAttribute('src'))
          [i].replace(
            /https:\/\/images-fe.ssl-images-amazon.com\/images\/I\/01MKUOLsA5L._AC_UL200_SR200,200_.gif/g,
            '/assets/images/no-image.jpg'
          ),
        alt: list.map((el) => el.getAttribute('alt'))[i],
      };
      Datas.push(Data);
    }
    return Datas;
  }, imgSelector);
  const getAutor = await page.evaluate((selector) => {
    const list = [...document.querySelectorAll(selector)].map(
      (el) => el.innerText
    );
    const Datas = [];
    const numberOfRankings = 16;
    for (let i = 0; i < numberOfRankings; i++) {
      const listData = {
        author: list[i],
      };
      Datas.push(listData);
    }
    return Datas;
  }, authorSelector);

  const getLink = await page.evaluate((selector) => {
    const list = [...document.querySelectorAll(selector)];
    const Datas = [];
    const numberOfRankings = 30;
    for (let i = 0; i < numberOfRankings; i++) {
      const Data = {
        link: list.map(
          (el) => 'https://www.amazon.co.jp/' + el.getAttribute('href')
        )[i],
      };
      Datas.push(Data);
    }
    return Datas;
  }, linkSelector);

  const releaseData = getTitle.map((data, i) => {
    return {
      ...data,
      ...getAutor[i],
      ...getimage[i],
      ...getLink[i],
    };
  });

  const results = { releaseData };

  return db.collection('newRelease').doc(`${name}`).set(results);
};

const scrapeRanking = async (url: string, name: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const bookInfosSelector = '#zg-ordered-list li .a-section img';
  const authorsSelector =
    'li.zg-item-immersion span.zg-item > div:nth-child(2)';
  const detailelinkSelector =
    '#zg-ordered-list li .a-section span.aok-inline-block > .a-link-normal';

  const bookInfos: any = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    const bookDatas = [];
    const numberOfRankings = 30;
    for (let i = 0; i < numberOfRankings; i++) {
      const bookData = {
        title: list[i].alt
          .replace(/【Amazon.co.jp限定】/g, '')
          .replace(/Amazon.co.jp/g, ''),
        img: list[i].src.replace(
          /https:\/\/images-fe.ssl-images-amazon.com\/images\/I\/01MKUOLsA5L._AC_UL200_SR200,200_.gif/g,
          '/assets/images/no-image.jpg'
        ),
      };
      bookDatas.push(bookData);
    }

    return bookDatas;
  }, bookInfosSelector);

  const authorsInfos = await page.evaluate((selector) => {
    const authorslist = Array.from(document.querySelectorAll(selector));
    const authorsDatas = [];
    const numberOfRankings = 30;
    for (let i = 0; i < numberOfRankings; i++) {
      const authorsData = {
        author: authorslist[i].innerText
          .replace(/5つ星のうち /, '')
          .replace(/\d/g, '')
          .replace(/.\n /, ''),
      };
      authorsDatas.push(authorsData);
    }
    return authorsDatas;
  }, authorsSelector);

  const getdetailLink = await page.evaluate((selector) => {
    const linklist = [...document.querySelectorAll(selector)].map((a) =>
      a.getAttribute('href')
    );
    const linkDatas = [];
    const numberOfRankings = 30;
    for (let i = 0; i < numberOfRankings; i++) {
      const listData = {
        link: 'https://www.amazon.co.jp/' + linklist[i],
      };
      linkDatas.push(listData);
    }
    return linkDatas;
  }, detailelinkSelector);

  const rankingBooksInfo = bookInfos.map((data: any, i: number) => {
    return {
      ...data,
      ...authorsInfos[i],
      ...getdetailLink[i],
    };
  });

  const results: any = { rankingBooksInfo };

  return db.collection('bookRanking').doc(`${name}`).set(results);
};

const scrapeAll = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  for (const urlData of newReleaseUrls) {
    await scrapeRelease(urlData.url, urlData.name);
  }
  for (const urlData of rankingUrls) {
    await scrapeRanking(urlData.url, urlData.name);
  }
  await browser.close();
};

export const getBookInfo = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onRequest(async (req: any, res: any) => {
    await scrapeAll();
    res.status(200).send('success');
  });
