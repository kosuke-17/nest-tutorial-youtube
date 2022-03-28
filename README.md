## プロジェクトの初期化

## auth モジュールの作成

## nest コマンドでモジュールを作成する

nest g module <モジュール名>

### 役割

- Controllers
  リクエストに対するレスポンスのハンドリングを行う
- Providers
  sevices のブロックでビジネスロジックを実行する

## Docker compose の利用

ひつようなコードをコピペしただけなので、今後この内容は細分化する

## Prisma

- prisma_Cli のインストール

npm i -D prisma
npm i @prisma/client

- prisma 初期化
  npx prisma init
- スキーマのマイグレーション
  npx prisma migrate dev

- DB の中を確認
  npx prisma studio

- バリデーション用のライブラリインストール
  npm i class-validator class-transformer

## パスワードをハッシュ化させる

npm i argon2

## 環境変数を利用するためのライブラリ

npm i @nestjs/config

## 認証用のライブラリ

npm i @nestjs/passport passport @nestjs/jwt passport-jwt

npm i -D @types/passport-jwt
