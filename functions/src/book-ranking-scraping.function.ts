import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
import * as admin from 'firebase-admin';

admin.initializeApp();
export const db = admin.firestore();

const urls: string[] = [
  'https://www.amazon.co.jp/gp/bestsellers/books/?ref=snv_ranking_allbook', // 総合
  'https://www.amazon.co.jp/gp/bestsellers/books/4852983051?ref=snv_ranking_hobby', // 趣味・実用
  'https://www.amazon.co.jp/gp/bestsellers/books/5326865051?ref=snv_ranking_comic', // コミック・ラノベ
  'https://www.amazon.co.jp/gp/bestsellers/books/4852973051?ref=snv_ranking_business', // ビジネス・経済
  'https://www.amazon.co.jp/gp/bestsellers/books/4852966051?ref=snv_ranking_jinbun', // 人文・思想
  'https://www.amazon.co.jp/gp/bestsellers/books/4852944051?ref=snv_ranking_bungaku', // 文学・評論
];

const scrape = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const caregorySelector = '#zg h1';
  const bookInfosSelector = '#zg-ordered-list li .a-section img';
  const authorsSelector =
    'li.zg-item-immersion span.zg-item > div:nth-child(2)';

  const categoty = await page.$eval(caregorySelector, (item) => {
    return item.textContent?.replace(/\(Kindle本を除く\)/g, '');
  });

  const bookInfos: any = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    const bookDatas = [];
    const numberOfRankings = 30;
    for (let i = 0; i < numberOfRankings; i++) {
      const bookData = {
        title: list[i].alt
          .replace(/【Amazon.co.jp限定】/g, '')
          .replace(/Amazon.co.jp/g, ''),
        img: list[i].src,
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

  const result = bookInfos.map((data: any, i: number) => {
    return {
      ...data,
      ...authorsInfos[i],
    };
  });

  const results: any = {};
  for (let i = 0; i < result.length; i++) {
    results[i] = result[i];
  }

  return db.collection('bookRanking').doc(`${categoty}`).set(results);
};

const scrapeAll = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  for (const url of urls) {
    await scrape(url);
  }
  await browser.close();
};

export const getBookInfo = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 300,
    memory: '2GB',
  })
  .https.onRequest(async (req: any, res: any) => {
    await scrapeAll();
    res.status(200).send('success');
  });
