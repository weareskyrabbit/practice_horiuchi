## スクリプト
普通のJavaScriptファイル

## モジュール
- `import`他のモジュールから変数,関数,クラスなどをインポート
- `export`他のモジュールに変数,関数,クラスなどを公開

以上を含むJavaScriptファイル

## コミット種別
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

