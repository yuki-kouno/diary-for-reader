import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

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

  const listSelector = '#zg-ordered-list li .a-section img';
  const itemSelector = '#zg h1';

  const results = [];

  const categoty = await page.$eval(itemSelector, (item) => {
    return item.textContent;
  });
  results.push(categoty);

  const bookInfo = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    const datas = [];
    for (let i = 0; i < 30; i++) {
      const data = {
        id: i,
        title: list[i].alt
          .replace(/【Amazon.co.jp限定】/g, '')
          .replace(/Amazon.co.jp/g, ''),
        img: list[i].src,
      };
      datas.push(data);
    }
    return datas;
  }, listSelector);
  results.push(bookInfo);
  return results;
};

const scrapeAll = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  for (const url of urls) {
    await scrape(url);
  }
  await browser.close();
  return scrape;
};

export const getBookInfo = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB',
  })
  .https.onCall(async (data, context) => {
    return scrapeAll();
  });
