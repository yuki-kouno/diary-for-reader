const puppeteer = require('puppeteer');
const urls = [
  // 'https://www.amazon.co.jp/gp/bestsellers/books/13384021?ref=snv_ranking_magazine', // 総合
  // 'https://www.amazon.co.jp/gp/bestsellers/books/4852983051?ref=snv_ranking_hobby', // 趣味・実用
  // 'https://www.amazon.co.jp/gp/bestsellers/books/5326865051?ref=snv_ranking_comic', // コミック・ラノベ
  'https://www.amazon.co.jp/gp/bestsellers/books/4852973051?ref=snv_ranking_business', // ビジネス・経済
  // 'https://www.amazon.co.jp/gp/bestsellers/books/4852966051?ref=snv_ranking_jinbun', // 人文・思想
  // 'https://www.amazon.co.jp/gp/bestsellers/books/4852944051?ref=snv_ranking_bungaku', // 文学・評論
];

const scrape = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  page.waitForSelector('#zg-right-col');

  const listSelector = '#zg-ordered-list li .a-section img';
  const itemSelector = '#zg h1';
  const authorsSelector =
    'li.zg-item-immersion span.zg-item > div:nth-child(2)';

  var category = await page.$eval(itemSelector, (item) => {
    return item.textContent.replace(/\(Kindle本を除く\)/g, '');
  });

  const bookInfos = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    const bookDatas = [];
    for (let i = 0; i < 10; i++) {
      var bookData = {
        title: list[i].alt
          .replace(/【Amazon.co.jp限定】/g, '')
          .replace(/Amazon.co.jp/g, ''),
        img: list[i].src,
      };
      bookDatas.push(bookData);
    }
    return bookDatas;
  }, listSelector);

  const authorsInfos = await page.evaluate((selector) => {
    const authorslist = Array.from(document.querySelectorAll(selector));
    const authorsDatas = [];
    for (let i = 0; i < 10; i++) {
      var authorsData = {
        author: authorslist[i].innerText
          .replace(/5つ星のうち /, '')
          .replace(/\d/g, '')
          .replace(/.\n /, ''),
      };
      authorsDatas.push(authorsData);
    }
    return authorsDatas;
  }, authorsSelector);

  const result = bookInfos.map((data, i) => {
    return {
      ...data,
      ...authorsInfos[i],
    };
  });

  // const result = bookInfos.map((data, i) => {
  //   return {
  //     ...data,
  //     ...authorsInfos[i]
  //   }
  // })

  // const resultFormat = {};
  // for(let i = 0; i < result.length; i++) {
  //   resultFormat[i] = result[i];
  // }
  // return resultFormat
  // console.log(resultFormat)
  // console.log(authorsInfos);
  // console.log(bookInfos);
  console.log(result);
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const resultsScrapeAll = [];
  for (const url of urls) {
    await scrape(browser, url);
  }
  browser.close();
  // console.log(resultsScrapeAll);
})();
