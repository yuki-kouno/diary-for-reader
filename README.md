# 読書家のための日記帳

読書家のための日記帳はアウトプットが苦手な人でも簡単に、普段からアウトプットをしている人にはさらに効果的なアウトプットができるように考えたサービスです

<img width="817" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117559800-540a3b00-b0c3-11eb-91f0-6e282f390776.png">

<img height="48px" alt="Angular logo" src="https://user-images.githubusercontent.com/57104153/117561733-693b9580-b0d4-11eb-8785-6ce44787f793.png"> <img height="48px" alt="Firebase logo" src="https://user-images.githubusercontent.com/57104153/117561754-8c664500-b0d4-11eb-8e9c-d83707db1dd7.png">

このサービスはAngular、Firebaseを使ったSinglePageApplicationです

***

## 使用技術

<img height="32px" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117562499-5035e300-b0da-11eb-9737-15012e812ef3.png">
Algolia - firestoreデータをワード検索で取得
<br>
functions:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/algolia.ts<br>
functions:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/favorite-book.function.ts
service:https://github.com/yuki-kouno/diary-for-reader/blob/master/src/app/services/search-library.service.ts<br>
component:https://github.com/yuki-kouno/diary-for-reader/tree/master/src/app/library<br>
本サービスでは実装していませんが、タグ検索やpagenationの併用も対応できます。
<br>
<br>
<img height="32px" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117562794-a86de480-b0dc-11eb-817e-3c27c06828ee.png">
GoogleBooksApi - サービス内に登録する本のデータ取得
<br>
service:https://github.com/yuki-kouno/diary-for-reader/blob/master/src/app/services/google-books-api.service.ts<br>
component:https://github.com/yuki-kouno/diary-for-reader/tree/master/src/app/add-books/search-books
<br>
<br>
<img height="32px" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117563013-f0d9d200-b0dd-11eb-8803-6e071e169c26.png">
Fullcalendar - カレンダー機能の実装
<br>
component:https://github.com/yuki-kouno/diary-for-reader/tree/master/src/app/calendar/calendar
<br>
<br>
<img height="40px" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117563084-7b223600-b0de-11eb-91c8-fafdfbcfd01c.png">
Puppeteer - amazonの販売情報取得 -> AmazonProductAdvertisingAPI変更予定
<br>
functions:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/book-ranking-scraping.function.ts
<br>
<br>
<img height="32px" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117563163-08fe2100-b0df-11eb-92ca-35b2ea434c56.png">
SendGrid - welcomeメール・退会処理完了通知
<br>
functions:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/send-email.function.ts
functions:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/user.function.ts
<br>
<br>
GithubActions - 自動build/deploy/OGP<br>
yml:https://github.com/yuki-kouno/diary-for-reader/blob/master/.github/workflows/main.yml
<br><br>
GoogleAppsScript - バックアップ・CloudFunctions定期実行...<br>
buckup:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/backup.function.ts<br>
render:https://github.com/yuki-kouno/diary-for-reader/blob/master/functions/src/render.function.ts
