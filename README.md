# 忍具鉤縄
忍者は画像を見つけて落とす。

TwitterWebに存在する画像群は、右クリックからの保存が効かず、我々は手をこまねいていた。
鉤縄はそれら画像群から必要な物を効率的に選択し、一括保存を実現する。

## 開発環境
### 構築手順
Node.js v4.2.3 を使用。
- `$ npm install` -> パッケージインストール
- `$ npm run watch` -> 実行

### 環境変数
[Twitter Application Management](https://apps.twitter.com) にアプリ登録を行い、環境変数に鍵の値を追加。
- `KAGINAWA_CONSUMER_KEY` -> Consumer Key (API Key)
- `KAGINAWA_CONSUMER_SECRET` -> Consumer Secret (API Secret)

bashの場合 `~/.bash_profile` へ以下のように記述。
```bash
export KAGINAWA_CONSUMER_KEY="hoge"
export KAGINAWA_CONSUMER_SECRET="fuga"
```

### ファイル構成
- `kaginawa/src/*` -> フロントエンドソース
- `kaginawa/server.js` -> モックサーバ 

### 使用言語など
- ECMAScript6
- Jade
- Sass + CSSnext

### ライブラリなど
- React.js -> クライアントサイド
- Express -> 開発用API提供
- Passport -> OAuth認証

### ビルドツールなど
- Gulp
- Webpack
