# 読書家のための日記帳

読書家のための日記帳はアウトプットが苦手な人でも簡単に、普段からアウトプットをしている人にはさらに効果的なアウトプットができるように考えたサービスです

<img width="817" alt="読書家のための日記帳画像" src="https://user-images.githubusercontent.com/57104153/117559800-540a3b00-b0c3-11eb-91f0-6e282f390776.png">

<img height="48px" alt="Angular logo" src="https://user-images.githubusercontent.com/57104153/117561733-693b9580-b0d4-11eb-8785-6ce44787f793.png"> <img height="48px" alt="Firebase logo" src="https://user-images.githubusercontent.com/57104153/117561754-8c664500-b0d4-11eb-8e9c-d83707db1dd7.png">

このサービスはAngular、Firebaseを使ったSinglePageApplicationです

***

# 実装内容

### 認証

- EメールとパスワードにでのログインとGoogleアカウントによるログイン
- アカウント作成時のwelcomeメール
- パスワードを忘れた場合のパスワードリセット
- パスワード自動生成
- ログイン状態とEメールアドレスの認証状態の監視による外部アクセスからのガード
- 全てのデータを削除する退会
- 退会完了通知メール

![hb2cl-4rfae](https://user-images.githubusercontent.com/57104153/122393710-219c0980-cfb0-11eb-9fc8-a1f19261de18.gif)<br><br>

### TOP画面

- ツアー機能
- Amazon新刊情報取得
- スライド機能
- 本の検索機能・登録


![yxe7z-g00p9](https://user-images.githubusercontent.com/57104153/122399662-f4525a00-cfb5-11eb-9099-d2481f771fd0.gif)<br><br>

### ライブラリー

- ソート
- ライブラリ内検索

![ju82k-rdu8u](https://user-images.githubusercontent.com/57104153/122404456-367d9a80-cfba-11eb-8003-780422e2d5b6.gif)<br><br>


### レビュー


- レビュー・編集・削除
- 質問選択
- 質問作成
- 今日のレビューと過去のレビュー一覧のタブ切り替え
- レヴュー一覧のソート

![82kq0-is7t0](https://user-images.githubusercontent.com/57104153/122407728-cfadb080-cfbc-11eb-80be-82530d0af320.gif)<br><br>

### カレンダー

- カレンダー
- 詳細モーダル

![7npfn-f1c00](https://user-images.githubusercontent.com/57104153/122408938-b48f7080-cfbd-11eb-946c-9456dbefd733.gif)<br><br>

### ランキング

- 一時間毎に本の売れ筋ランキング情報取得

![sj4fr-buwzp](https://user-images.githubusercontent.com/57104153/122410760-2b793900-cfbf-11eb-8aa7-61afd35a3683.gif)


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
