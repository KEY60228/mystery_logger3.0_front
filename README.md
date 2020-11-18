# 実装方針

まずはゴリゴリ進めよう！

細かいところとデザインは後々やればOK！

## ディレクトリ構成

src/

├ ajax/             APIを叩く非同期ファンクション

├ components/       見た目を担う

│   ├ molecules/    再利用性あり

│   ├ organisms/    再利用性なし、Reduxアクセス可

│   └ templates/    最終的な見た目

├ containers/       機能を担う

├ stores/           Reduxストア

├ @types.ts         型定義ファイル

├ App.tsx           ルーティング

└ index.tsx         入り口

### containers/

- ルーティング単位
- APIを叩く

### templates/

- ページ単位
- 認証失敗ページや404ページはtemplates/
- modal等はフルスクリーンでもtemplates/以下
- modalのopen/setOpen等、見た目に関係するstateはuseStateで所有可能

### organisms/

- 再利用しないコンポーネント
- Reduxストアにアクセス可能
- modalのopen/setOpen等、見た目に関係するstateはuseStateで所有可能
- 少し気持ち悪いけどHeader, BottomNavはここに

### molecules/

- 再利用するコンポーネント
- modalのopen/setOpen等、見た目に関係するstateはuseStateで所有可能

