## TL;DR

だいぶ遅れましたが！
`https://twitter.com/araottii/status/1151510898042798081` により、ワイもうんコードを提出することにしました。
`#チケット料金モデリング`のハッシュタグは`https://twitter.com/at_grandpa/status/1150633625802563584`まで読んだ状態で以下のコードを書いています。

## このrepositoryについて

[qiitaにまとめました](https://example.com)。

### how to use

#### インストールとビルド

```bash
$ npm install && npm run build
```

#### 実行について

```bash
$ echo '{"movie": "general", "customerTypes": ["handicapped"], "datetime": "1970-01-01T00:00:00+09:00"}' | node scripts/start.js
```

##### データ構造

ref: https://github.com/jupemara/ddd-ticket/blob/master/src/adapter/controller/request_payload/CalculateAmountOfTickets.ts

```TypeScript
{
  movie: String;
  customerTypes: String[];
  datetime: String; // as ISO8601
}
```

e.g:

```json
{
  "movie": "general",
  "customerTypes": ["handicapped"],
  "datetime": "1970-01-01T00:00:00+09:00"
}
```

## 前提条件

今回のドメインモデリングではオフラインでのデータが必要(学生証の提示とかそういうの)なので、映画館受付スタッフが受付で画面をポチポチしていくようなケースを考えました。(もちろんオンラインで決済するケースもあると思うんですが、あくまでスコープを映画館受付スタッフが人を見て、"学生さん5人ですね、5人分の学生証提示してください"的なユースケースです。)

## 対応しないといけないユースケース

- 顧客
    + 一般
    + シネマシティズン
    + シネマシティズンで且つ60歳以上
    + MIカードユーザ
    + シニア
    + 学生(大, 専)
    + 学生(中, 高)
    + 幼児, 小学生
    + 駐車券
    + 障害者(学生以上)
    + 障害者(学生以上)+同伴者がいる
    + 障害者(高校生以下)の同伴者がいる
- 上映日
    + 平日
        * レイトショー
    + 土日
        * レイトショー
    + 映画の日
- 映画の種類
    + 通常
    + 特別興行: ただしこの場合は料金プランの記載がないように見えたので今回は問い合わせとする
    + 極上爆音上映

上記のそれぞれの掛け合わせ

## 実際のユースケース

- 映画館受付スタッフは、対象の映画を選択し、その後顧客の種類と顧客の人数を選択する、すると支払い金額が算出される

## ドメインオブジェクトとして使えそうな用語

- 映画館受付スタッフ(これはロールに近いのでドメインオブジェクトとしては入ってこないかもしれなひ)
- 対象の映画
- 映画の種類
- 顧客
- 顧客の種類
- 支払金額

## まとめ

"対応しないといけないユースケース"から考えると、_現状では_、顧客の種類と映画の種類、上映日がわかれば金額が算出できるということになるんじゃないかと思います。
オプションとして自分が考えたのは

1. 日時, 映画の種類, 顧客の種類を渡すと金額が返ってくるパターン
    + if をひとつのFeeDetectServiceみたいなものに集約できる
    + 変数が増えたときに、CaseClassは増えるけど、変更点はこのServiceの引数とif文のみになる
    + ただif文の条件は if (Fee.isWeekDay && Movie.isSpecial && Customer.isUniversityStudent) みたいな感じにしあがってしまう
2. 日時をベースに映画の種類, 顧客の種類が決まれば金額が決まる
    + おそらく上映日による平日,土日,映画の日というドメインオブジェクトは種類が上限でここの種類がかなり多くなるというケースは考えにくそう
3. 映画の種類をベースにして、日時, 顧客の種類が決まれば金額が決まる
    + 映画の種類はもしかしたら極上音質上映とか増えるかも(しらんけどｗ)
4. 顧客の種類をベースにして、日時, 映画の種類が決まれば金額が決まる
5. チケットという概念を導入して1.を実装する

上記の5つかなっと考えた結果、

- 1人だけの料金を実装するなら↑で問題なさそうやけど、よく考えたら映画館で受付してもらうときはアベックで来たりとか複数人数でチケット買いに来るユースケースが大半そうなこと、支払い合計に障害者の同伴者を含んだ場合、障害者1+同伴者2以上はビジネスルール違反を反映させるためには複数人数を受け取って合計料金を返すようなユースケース(ドメインオブジェクト)が必要と判断した
- 定価(割引対象外の顧客が来たとき)をどのオブジェクトに持たせるかを考えたとき、**映画料金の定価**に対して学割やらレイトショー割が効いてくる?

1. 複数人数のチケット料金を算出するドメインオブジェクトorドメインサービス
2. 1内で使われる一人あたりのチケット料金を算出するドメインオブジェクトorドメインサービス

が必要と判断しました。イメージとしては

```TypeScript
// 合計料金を返すサービス
// OrderとかPurchasingとかTransactionみたいな名前の方がよりビジネスロジックに近いかも
interface TicketFeeAmountCalculationService {
  calculate(Movie, AmountOfCustomer, ScreenDate): AmountOfPrice
}

// チケット料金1枚あたりを計算するドメインモデル
interface Ticket {
  calculate(Movie, Customer, ScreenDate): Price
}

// もしくは購入履歴をデータベースに保存したりするケースの場合, ticketを集約として
// 実際のサービス導入に関してはMovieをmovieIdにして遅延読み込みさせたりするかもしれない
class Ticket {
  private readonly movie: Movie;
  private readonly customer: Customer;
  private readonly screenDate: ScreenDate;
  constructor(movie: Movie, customer: Customer, screenDate: ScreenDate) {
    this.movie = movie;
    this.customer = customer;
    this.screenDateTime = screenDate;
  }
  calculate(): Price {
    // calculation domain logic per 1 ticket;
    return 10000 as Price;
  }
}
```

みたいな形でチケットごとの映画の種類x顧客x上映日での料金を算出して、その後合計を返すというのがビジネスの流れを自然に表現しているように感じました!

----

## 実装しながら悩んだこと

- 書きながらチケット料金は、`チケット.料金を計算する()`なんじゃね??ってことに気つきました
    + ので例えば、`映画の日.顧客種類による割引を適用する()`とか`顧客.上映スケジュールによる割引を敵意要する()`というのはどっちをベースにするかっていう議論が間違っているようにワイには主会えました
- 学生証とかそういうクラス作るかどうか問題
    + オンライン決済システムなら必要かもしれないと思ったけど、映画館受付スタッフさんが判断してくれるので顧客の種類を表現するクラスだけにとどめた(逃げたともいうｗ)
    + ただ将来的に写真アップロードで各種割引するみたいなのはあるかもしれないのでそこは別のユースケースで考えないといけないなぁとは思ってます
- 各種(例えば一般, シニアなど)クラスを定義するかどうか
    + ここ最後までめっちゃ悩みましたが(なんなら今も悩んでますｗ)、映画館受付スタッフがポチポチしていくのであれば種類フィールドだけを持てばいいのかなと考え、作りませんでした。ただ将来的には `interface Customer` からの `class Student implements Customer` 的な形で学生証を持ってて且つ年齢がxx以下なら学生とするみたいなビジネスロジックを入れてもいいのかなと考えています
        * っというかそもそもこういうの実は解決されている気がする(自分の知識不足)

### 障害者と同伴者を制限する

- 障害者1人+同伴者3人 -> 障害者1人+同伴者1人+一般2人
    + 余った一般2人をどうするか考えないといけないけど、自動でやってあげるより、障害者1人あたり同伴者1人というルールですよというエラーを返す方が親切かなという判断により
        1. 障害者1人だけのケースはそのまま金額を返す
        2. 全体が2人以上で障害者1人+同伴者1人以外: error
        3. 障害者1人+同伴者2人以上: error