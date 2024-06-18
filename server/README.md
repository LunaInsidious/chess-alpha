# API

Golangバージョン
```
go >= 1.19
```

## メンテナンス
- goのバージョン管理
    - Dockerfile
    - Dockerfile.env
    - .golangci.yml内のgoバージョン
- go.modのバージョン管理

## 開発方法
1. 環境変数の設定
    1. `cp .env.example .env.dev`
    2. `.env.dev`の環境変数を埋める。
2. `make run-dev`で開発用コンテナを起動する。
3. `make init-db`を実行し、初期データを作成する。

### 開発用docker composeで立ち上がるコンテナ
- api
  golang echoサーバ
- mysql
  mysqlサーバ
- phpmyadmin
  mysqlをGUI操作するクライアント

## テスト

```sh
# テストDBと接続しない処理のテスト
make test-without-db

# テストDBを利用したテスト
make test

# 一部のテストだけ実行
make partial-test TEST_NAME=TestFindMe/成功
# 部分一致検索でテスト名を含むテストをすべて実行も可能
make partial-test TEST_NAME=TestFindMe
# 引数なしで結合テストをすべて実行
make partial-test

# テスト時にカバレッジ出力
make test-coverage
# cover.htmlでカバレッジを確認できる
```

### 開発用docker composeで立ち上がるコンテナ
- test-api
  golang echoサーバ
  `make test`実行時に一時的に作成され、実行後にコンテナは削除される。
- test-mysql
  テスト用のmysqlサーバ

## その他コマンド
```sh
# lintの実行
make lint

# フォーマットの実行
make format
```

## モックの作成

userの場合

```sh
mockgen -source=./usecase/output_port/user.go -destination ./usecase/output_port_mock/user.go
```

usecase/port_mock内のファイルはusecase/portを元に自動で生成されるので，直接修正しない


## マイグレーション
### マイグレーションファイルの生成

```sh
migrate create -ext sql -dir db/migrations -seq <名前>
```

### マイグレーションファイルの内容を出力

```sh
# 1.マイグレーションファイルの出力
mysqldump -u root -p template -d > example.sql

# 2.lsコマンドで出力ファイルの存在確認
ls

# 3.example.sqlの存在を確認できれば、catコマンドでファイルの内容出力
cat example.sql

# 4.出力したファイルの内容をコピーし、migrationファイルにペーストする
```

### マイグレーションの実行(開発環境)

```sh
migrate -path db/migrations -database "mysql://$DB_USER:$DB_PASSWORD@tcp($DB_HOST:3306)/$DB_NAME?multiStatements=true" up
```

末尾に数を与えることでマイグレーションファイルを指定できる

```sh
migrate -path db/migrations -database "mysql://$DB_USER:$DB_PASSWORD@tcp($DB_HOST:3306)/$DB_NAME?multiStatements=true" up 1
```


### マイグレーションを削除

```sh
migrate -path db/migrations -database "mysql://$DB_USER:$DB_PASSWORD@tcp($DB_HOST:3306)/$DB_NAME?multiStatements=true" down
```
