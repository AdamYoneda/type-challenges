# Type Challenges ローカル練習ガイド

warmup から easy までのチャレンジをローカルで解き、解答履歴を git で管理する手順。

## セットアップ

```bash
# 依存インストール
pnpm install

# playground 生成（言語選択で ja を選ぶ）
pnpm generate
```

`playground/` ディレクトリに難易度別フォルダが生成される:

```
playground/
  warm/
    00013-warm-hello-world.ts
  easy/
    00004-easy-pick.ts
    00007-easy-readonly.ts
    ...
```

各ファイルには template（解答欄）と test-cases が結合されている。

## 解き方

1. `playground/warm/` または `playground/easy/` 内のファイルを開く
2. `type XXX = any` の `any` 部分を書き換えて型を実装する
3. 型チェックで正解を確認:

```bash
# 全体チェック
npx tsc --noEmit

# 個別チェック
npx tsc --noEmit playground/warm/00013-warm-hello-world.ts
```

エラーが出なければ正解。

## 進捗の記録

解答したらコミットして履歴を残す:

```bash
git add playground/
git commit -m "solve: 00013 warm hello-world"
```

## チャレンジ一覧

### Warm-up (1問)

| # | 問題 |
|---|------|
| 00013 | Hello World |

### Easy (13問)

| # | 問題 |
|---|------|
| 00004 | Pick |
| 00007 | Readonly |
| 00011 | Tuple to Object |
| 00014 | First of Array |
| 00018 | Length of Tuple |
| 00043 | Exclude |
| 00189 | Awaited |
| 00268 | If |
| 00533 | Concat |
| 00898 | Includes |
| 03057 | Push |
| 03060 | Unshift |
| 03312 | Parameters |

## 再生成時の注意

playground を再生成する場合、`-K` フラグで既存の解答を保持できる:

```bash
pnpm generate -- --keep-changes
# または
pnpm generate -- -K
```
