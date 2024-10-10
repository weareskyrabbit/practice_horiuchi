## スクリプト
普通のJavaScriptファイル

## モジュール
- `import`他のモジュールから変数,関数,クラスなどをインポート
- `export`他のモジュールに変数,関数,クラスなどを公開

以上を含むJavaScriptファイル

# コミット種別
- `fix`: バグ修正
- `hotfix`: クリティカルなバグ修正
- `add`: 新規(ファイル)機能追加
- `update`: 機能修正(✕バグ)
- `change`: 仕様変更
- `clean`: 整理(リファクタリングetc)
- `disable`: 無効化(コメントアウトetc)
- `remove`: 消去(ファイル)
- `upgrade`: バージョンアップ
- `revert`: 変更取り消し

# ---Sourcetree---

## ファイル作成
cmdで
```
touch ファイル名
```

## コミット
ファイルステータス→すべて選択→コメント→コミット

ブランチ→プッシュ(origin表記でサーバーに上がっている)

## プル
ソース更新

## フェッチ
ローカルへ(編集)

## スタッシュ
一時退避(コミットはされない)
適用する→コミットできるようになる

## マージ
コミットしてきた自分の作業(reversi_Add)をGithubのプルリクエストをした後、developブランチに融合する



# ---yarn実行---
```
cd /bighero/app
yarn run dev
```



# ---VSCode---

## 保存
Ctrl+S

## デバックを実行
cmdで
```
npm run debug
```
止めたい行数で赤ポチ→バグを突き止める

## ソース内検索
選択
Ctrl+F



## ---SQL---

SELECT文で抽出したカラムに別名をつける
※カンマなしでASなしでもOK
```
SELECT 列名 AS 別名 FROM テーブル名;
```

OFFSET LIMIT
0レコード目～30レコード目を表示
```
OFFSET 0,
LIMIT 30;
```



# ---TypeScripとは---

## letの変数宣言
```
let x = 1;
x = 2 // 再代入が可能
```
```
let x; // 初期値なしでも可能
x = 1; // 後で代入
```

## constの変数宣言
```
const y = 1;
y = 1; // 再代入は不可
```
```
const obj = { a: 1} ;
obj = { a: 2 }; // 再代入は不可
obj.a = 2; //プロパティの変更は可能
```
```
const arr = [1, 2];
arr = [3, 4]; // 再代入は不可
arr.push(3); //要素の変更は可能
```
`readonly`をつけると読み取り専用になる
```
let obj: {
    readonly foo: number;
};
obj = { foo: 1 };
obj.foo = 2; //コンパイラー警告
```

## 変数宣言の型注釈
```
const num: number = 123;
```

# 基本的な型
## プリミティブ型
- `boolean`: 真偽型
- `nuber`: 数値
- `string`: 文字列
- `bigint`: 大きな整数
- `symbol`: 一意の値
- `undefined`: 値が定義されていない
- `null`: 値が存在しない
```
const isReady: boolean = false;
const age: number = 25;
const fullName: string = "John Doe";
const bigNumber: bigint = 100n;
const uniqueSymbol: symbol = Symbol("unique");
const notDefined: undefined = undefined;
const empty: null = null;
```

## 特殊な型
- `any`: 何でもOK、型が不明な場合に使用、操作できる
- `unknown`: 何でもOK、操作はできない
- `void`: 値が存在しない、関数が何も返さない場合に使用
- `never`: 決して何も返さない、エラーを投げる関数や無限ループの関数の戻り値として使用
```
const a: any = 100; // 代入できる
console.log(a * 3); // 操作もできる
 
const x: unknown = 100; // 代入はできる
console.log(x * 3); // 操作はできない
 
// 戻り値のない関数
function doSomething(): void {}
 
// 戻り値を返すことがありえない関数
function throwError(): never {
  throw new Error();
}
```

## 型エイリアス
```
type StringOrNumber = string | number;
let value: StringOrNumber;
value = "hello"; // string型が代入可能
value = 123; // number型も代入可能
```

## 構造的部分型
```
type Summary = { name: string };
type Detail = { name: string; age: number };
 
const johnDetail: Detail = { name: "John", age: 28 };
const summary: Summary = johnDetail; // 代入できる。構造的部分型として互換があるため
 
const johnSummary: Summary = { name: "John" };
const detail: Detail = johnSummary; // 代入できない。構造的部分型として互換がない（ageを含まないため）
```

# 配列
## 配列リテラル
配列の初期値を設定できる。
```
const number = [1, 2, 3];
```
## 配列の型注釈
どちらかを使う
```
let numbers: number[];
let strings: Array<string>;
```

