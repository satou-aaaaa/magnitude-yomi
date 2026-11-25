# AGENTS.md

マグニチュードよみ：2つの地震のマグニチュードを見て、エネルギーが何倍ちがうか（0.2で約2倍・1で約32倍・2で約1000倍）を当てる1日5問の学習ゲーム。正解したら、出てきた文がマグニチュードと震度のどちらにあてはまるかも選ぶ。マグニチュードの数え方・震度とのちがい・記録と求め方の問題も出る。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（32種類×3000問：選び肢・答えは1つ・答えと2段目が気象庁の決まりどおり・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は気象庁「震度・マグニチュード・地震情報について」<https://www.jma.go.jp/jma/kishou/know/faq/faq27.html>・「よくある質問（地震について）」<https://www.jma.go.jp/jma/kishou/know/faq/faq7.html> と松江地方気象台「地震の基礎知識」<https://www.data.jma.go.jp/matsue/mission/earthquake/jishin/jishin-basic.html> に書いてあることだけ（2026-11-25 に読んだ。要点は共有フォルダ games/magnitude-research.md）。種類を足すときもページを読み、`qa/run.mjs` の表（`BASE`・`ST2`・`FACT`）にも足す。
- 扱うのは、マグニチュードの数え方（差とエネルギーの比・Mw）と震度とのちがいだけ。震度階級の揺れの様子（震度よみ shindo-yomi）・星の等級（星の等級よみ toukyu-yomi）・地震のあとの行動と重ねない。問題の地震A・Bは練習の例で、本物の地震ではない。
- 言い方：遊び方と「このゲームについて」と README に、問題の地震は練習のための例で本物の地震ではないことを置く（QA が見る）。3・4の差の約3万倍・約100万倍は約32倍と約1000倍をかけた目安で、QA が data.js と別に計算して確かめる。
- 問題は2つの形。エネルギーくらべの問題（`m<小さいほうのM×10>x<大きいほうのM×10>`）は、差で何倍か（5つ）を選び、正解したら2段目で、出てきた文（`ST`）がマグニチュードと震度のどちらにあてはまるか（2つ）を選ぶ。やさしいは選び肢3つ（答えのとなりは1つまで）、ふつう・むずかしいは4つ（むずかしいは答えのとなりを必ず入れる）。むずかしいには3・4の差を入れる。しくみの問題は答え1つとまちがい2〜3つで、2段目は無い。2回目のヒントはまちがいを消して2つにしぼり、要点（`key`）も見せる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回し・まちがいの選び肢は、足すだけでも過去の日の問題が変わる。公開後は変えず、変えるときは QA の `PINS`（3日分の5問と上級）を作り直して理由を PR に書く。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「この文があてはまるのは？（マグニチュード・震度）」・復習（1→3→7日後）。記録 `mgy-v1`・文字 `mgy-fs`・復習 `mgy-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は全ゲーム共通の Google フォームを開くだけ（`Core.bindFeedback`。shared-workflows `template/core/` の写し。`.github/ISSUE_TEMPLATE/feedback.yml` は GitHub から送る人のための予備）。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は星の等級よみ（toukyu-yomi。そのもとは突風よみ toppu-yomi）から写した（ひな形の部品は `node scripts/new-game.mjs` で入れた）。写し元の言葉が残っていないかを QA が見る。保存の読み直しは共通部品 GameStore（`<!-- store:begin -->`〜`end`。shared-workflows `template/store/store.js` の写しで、ここでは直さない）。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
