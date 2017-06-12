Ben33 イベントオーガナイザー
===========================

使用技術
--------

- フロントエンド
    - AngularJS
- バックエンド
    - Node.js
    - MongoDB


設定
----

別途、MongoDBを用意しておいてください。

### モジュールインストール ###

```
bower install
npm install
```

### 開発時 ###

```
grunt serve
```


### build ###

```
grunt build
```

### 起動 ###

#### develop mode ####

```
cd dist
node server/app.js
```

#### production mode ####

```
cd dist
NODE_ENV=production node server/app.js
```

#### daemon ####

```
cd dist
NODE_ENV=production forever start server/app.js
```

foreverが入っていない場合は以下のようにインストール

```
npm install -g forever
```


License
-------
Copyright &copy; 2015 tamura shingo
Licensed under the [MIT License][MIT].

[MIT]: https://opensource.org/licenses/MIT

