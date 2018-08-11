# yoritomo san

[![Build Status](https://travis-ci.com/tsuyukimakoto/yoritomo.svg?branch=master)](https://travis-ci.com/tsuyukimakoto/yoritomo)


ランチのチーム分けを行うGoogle Apps Scriptです。名前は同じくGASとSlackで勤怠管理をおこなえる [みやもとさん](https://github.com/masuidrive/miyamoto) リスペクトです。

みやもと → 宮本武蔵 → 佐々木小次郎 → ささき…負けちゃうじゃん。 → 源頼朝 → よりともさん

今年（2018年）の夏は暑いですからね…。あ、ワタクシは鎌倉に住んでおりまして、お友達募集中です :-)

## モチベーション

- みんなでお昼ご飯行ったら楽しいよね
- ものを言いやすいように普段からコミュニケーションとれたら良いよね
- リモートワークしたりして会わないことも多いので同じ空間にいるときは特にね
- 仕事はログりたいので文字ベースだし
- あれ？なんか10人越えが増えてきて…入るの大変になってきた
- 部署横断できることが減ってきたよ？
- 入りやすい人数かつランダムに人を割り振ってくれると良いな
- インセンティブ欲しいからある程度の確率で会社から懇親費もらおう
- やべ、20人近い日も発生してきた

…ので手を動かした

## どのようなものか

### Slack経由でランチに行きたい時間をサインアップ

<img src="https://raw.githubusercontent.com/tsuyukimakoto/yoritomo/master/misc/images/question.png" width="508" height="187" alt="行きたい時間のボタンを押す" />

行きたい時間のボタンを押します。

- 時間を変更したい場合には別の時間のボタンを押します
- キャンセルしたい場合には同じ時間のボタンを押します

### 予定時間の10分前になると

<img src="https://raw.githubusercontent.com/tsuyukimakoto/yoritomo/master/misc/images/devide_team.png" width="458" height="121" alt="チーム分けされる" />

適当に集まってランチに出ましょう

### 当たり！

<img src="https://raw.githubusercontent.com/tsuyukimakoto/yoritomo/master/misc/images/lottery.png" width="385" height="97" alt="当たり！" />

チームの前に `当たり！` と出ます（地味）。

当たりが出るとついオプションを頼んだりしてしまうことが観測されています。

---

## 設置方法

### Apps Scriptのプロジェクトを作る

- [ここから](https://script.google.com/) ですが、Google Apps Scriptを使うには初期設定が必要かもしれません。ググってみてください。

Google Apps Script のプロジェクトを作れるようになったら新規作成します。

- プロジェクト名はなんでも良いけれど、Yoritomo-sanとか
- コード.gsにbundle.gsの中身をコピーペーストして保存する
- メニューの「ファイル」→「プロジェクトのプロパティ」を開いて「Time zone」を「東京」に合わせる

### 初期設定

- 実行 → 関数 → Init を選択します
- 承認が必要ですというダイアログが出るので「許可を確認」します
- アカウント選択画面が出るので実行ユーザーを選びます

#### 「このアプリは確認されていません」を乗り越える

- Chromeのストアで配布しているものではないので、危険なスクリプトとして認識されます

不安であれば先ほど貼り付けたコードを確認してください

- https://www.googleapis.com/auth/drive
- https://www.googleapis.com/auth/script.external_request
- https://www.googleapis.com/auth/script.scriptapp
- https://www.googleapis.com/auth/spreadsheets

はい、大変危険ですね。

- 危険を認識してコードを確認できたら、左下の詳細リンクをクリックすると危険を承知で利用できます
- 「Yoritomo-san（安全ではないページ）に移動」をクリックすると権限を求めるダイアログに遷移します
- 「許可」をクリックするとスクリプトが実行できるようになります
  - 先ほどInitをクリックしたのでInitが実行されます

### 設定を変更する

- Initで追加される項目は以下です。必要に応じて値を変更してください（ファイル → スクリプトのプロパティ）。

    |項目|値（デフォルト）|説明|
    |:--|:--|:--|
    |work_days_of_week, MON,TUE,WED,THU,FRI|カンマ区切りで曜日を区切ります。MON,TUE,WED,THU,FRI,SAT,SUNが使えます|
    |question_time|9:00|質問をSlackに投げる時間を設定します。フォーマットはデフォルト値を参考にしてください|
    |times|11:30,12:00,12:30,13:00|ランチに出発する時間の候補をカンマ区切りで設定します。時間の10分前になると抽選が行われてチーム分けがSlackに投げられます|
    |max_members|4|1チームの最大人数です|
    |lottery_ratio|100|1/nの確率でチームにあたりが出ます。あたりを出したくない場合には0を設定してください|
    |lottery_min_ratio|lottery_ratio|抽選が外れるたびにハズレをカウントしてカウント分をlottery_ratioから引きます。lottery_min_ratioよりは確率が高くならないように設定できます|

- その他の設定項目

    |項目|説明|
    |:--|:--|
    |file_id|現在使っているSpreadSheetのファイルIDです|
    |folder_id|SpreadSheetを保存するフォルダーのIDです|
    |webhook_url|SlackのIncomming Webhook URLです。後で作成するSlack appの設定を手動で設定します|
    |trigger_xxxxxx|プログラム制御用の項目です。当日中に自動で消えます|

- 当たる確率を徐々に上げたい場合

    `lottery_min_ratio` を `lottery_ratio` より小さな数字に設定します。抽選が行われて外れるたびにスクリプトのプロパティ `lottery_miss_count` がカウントアップされ、抽選時に `lottery_ratio` が `lottery_ratio` - `lottery_miss_count` に設定されます。 `lottery_miss_count` は抽選に当選が出るとその時点で `0にリセット` されます。

    `lottery_min_ratio` を1に設定すると、ずっと当たらない場合には100%当選します。1にすると数える人が出てくるので2以上が良いでしょう。

### Interactive Message用のSlack Appを作る

SlackのInteractive Messagesを使って外部とやりとりをするには、Slack appが必要です。

1. [Slack appの管理ページ](https://api.slack.com/slack-apps) をSlackのアカウントでログイン済みのブラウザで開きます
1. Create a Slack app をクリックし、以下を入力して `Create App` します。利用規約に従える場合のみですよ

    |項目|設定|
    |:-|:-|
    |App Name|後で変えられるので適当に「みんなランチに行きたいぞ」とかでも|
    |Development Slack Workspace|ランチ分割で使いたいWorkspaceを選択します|

1. 設定画面に遷移するので、いくつか設定をします
  - 左のメニューから Incoming Webhooks をクリックして設定を On にします
    - Add New Webhook to Workspace をクリックします
    - Post to にはランチ用のチャンネルを指定します
    - Authorizeをクリックします
    - あとで Google Apps Script 側に設定するので追加された Webhook の Copy ボタンを押してURLをメモしておきます（メモ1）
  - 左のメニューから Interactive Components をクリックして設定を On にします
    - ここで Request URL というものを入れます
      - 一度 App Script の画面を開き、「公開」→「ウェブアプリケーションとして導入」を選択します
        - `プロジェクト バージョン` 新規作成
        - `次のユーザーとしてアプリケーションを実行:` 自分
        - `アプリケーションにアクセスできるユーザー` は「全員（匿名ユーザーを含む）」にします
      - `現在のウェブ アプリケーションの URL:` が表示されますので、メモしておきます（メモ2）
    - Slackの画面に戻り、メモしておいたウェブアプリケーションのURL（メモ2）を Request URL に入れて Save Changes をクリックします
  - Basic Informationでアイコンなどをカスタマイズすると良いでしょう

### Apps Scriptの設定を続ける

Google Apps Scriptのプロジェクトページに戻ります

- 「ファイル」→「プロジェクトのプロパティ」→「スクリプトのプロパティ」で行を追加します
  - 名前に webhook_url と入れて、値に Slack App の Webhook の URL を入れます（メモ1）
  - 保存をクリック
- 時計アイコンをクリック（現在のプロジェクトのトリガー）
  - 「トリガーが設定されていません。今すぐ追加するにはここをクリックしてください。」をクリックします
  - 実行で「set_timer」を選択
    - 時間主導型、日タイマーにし、時間は、 question_time より2時間以上前にしておきます。
      - question_time がデフォルトの 9:00 の場合は 午前6〜7時などにしておくと良いでしょう

※ GASの画面からできる繰り返し時間設定が1時間の幅がある指定方法なため、このset_timerで毎日当日分を日時指定タイマーでセットします

---

## おまけ

テクノロジー的な特徴はこんな感じ

- SlackのInteractive Messagesを使ってボタンを出す
- SlackのInteractive Messagesからの情報はGASのWeb公開で受ける
- GASのスクリプトプロパティを永続KVS的に使う
- Google SpreadSheetに日々のデータは保存する
- SpreadSheetにデータが増えると重くなることがわかってるので1週間ごとのファイルに分ける
- GASの定期実行（date based）を毎日登録して実行したタイミングで自身のスケジュールを消す
- GASだけどTypescriptで書いてる
