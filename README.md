# Love Site - Dynamic Love Message

**サイト URL**: [https://raiton-boo.github.io/love-site/](https://raiton-boo.github.io/love-site/)

愛のメッセージサイトです。`|` 文字をドラッグして、愛の表現を段階的に変化させることができます。

## 機能

### 4 段階の愛の表現

距離に応じて以下のように変化します：

1. **`| I LOVE YOU |`** - 最初の完全な愛の告白
2. **`| I ♥ YOU |`** - ハートマークで少し親しみやすく
3. **`| I ♥ U |`** - よりカジュアルな表現
4. **`| ♥ |`** - 純粋なハートのみ

### 操作方法

- **ドラッグ操作**: `|` 文字をマウスやタッチでドラッグ
- **キーボード操作**:
  - `←` 左矢印キー：距離を縮める
  - `→` 右矢印キー：距離を広げる
- **自動デモ**: `スペース` キーで自動アニメーション開始/停止

## 使い方

### 基本操作

1. ページを開く
2. `|` 文字をマウスでドラッグするか、キーボードの矢印キーで操作
3. 距離に応じてメッセージが変化することを楽しむ

## レスポンシブ仕様

| 画面サイズ                  | 移動範囲 | フォントサイズ |
| --------------------------- | -------- | -------------- |
| デスクトップ (768px+)       | 8-40px   | 4rem           |
| タブレット (480-768px)      | 7-30px   | 3rem           |
| スマートフォン (360-480px)  | 6-20px   | 2.5rem         |
| 小型スマートフォン (-360px) | 5-15px   | 2rem           |

## 技術仕様

### 使用技術

- **HTML5**: 構造
- **CSS3**:
  - Flexbox レイアウト
  - CSS アニメーション（heartbeat、scaleIn）
  - レスポンシブデザイン
- **Vanilla JavaScript**:
  - ドラッグ&ドロップ API
  - タッチイベント対応
  - リアルタイム距離計算

### ファイル構成

```
love-site/
├── index.html      # メインHTML
├── style.css       # スタイルシート
├── script.js       # インタラクション制御
└── README.md       # このファイル
```

### 主要機能の実装

#### 距離ベース段階管理

```javascript
const messageStages = [
  { minDistance: 0, maxDistance: 12, text: '♥' },
  { minDistance: 13, maxDistance: 18, text: 'I ♥ U' },
  { minDistance: 19, maxDistance: 24, text: 'I ♥ YOU' },
  { minDistance: 25, maxDistance: 999, text: 'I LOVE YOU' },
];
```

## 特殊効果

- **ハートビートアニメーション**: `♥` 状態時の脈動効果
- **スムーズトランジション**: メッセージ変更時のスケールアニメーション
- **テキストシャドウ**: グロー効果によるビジュアル強化

## 📝 開発者向け情報

### カスタマイズ可能な要素

1. **メッセージ段階**: `messageStages` 配列で変更可能
2. **移動範囲**: `getMaxDistance()` / `getMinDistance()` 関数で調整
3. **アニメーション**: CSS の `@keyframes` で効果変更
4. **色彩**: CSS カスタムプロパティで一括変更可能

---

**Document write by ChatGPT4.1**