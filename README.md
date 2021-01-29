# 実装方針

まずはゴリゴリ進めよう！

細かいところとデザインは後々やればOK！

## ディレクトリ構成

src/

├ ajax/             APIを叩く非同期ファンクション

├ reusable/          複数のページから呼び出されるコンポーネント

│   ├ Header/       ヘッダー

│   ├ Loader/       ローダー

│   ├ ReviewCard/   レビューカード

│   ├ ProductCard/  作品情報

│

├ disposabe/        単一のページから成るコンポーネント     

│   ├ TopPage/

│   ├ Login/

│   ├ ProductDetail/

│   ├ ReviewDetail/

│   ├ Timeline/

│

├ handlers/         App.tsxから呼ばれるハンドラー

│   ├ ErrorHandler/     エラーハンドリングコンポーネント 

│   ├ PopHandler/       ポッパーハンドリングコンポーネント 

│   └ RouteHandler/     ルートハンドリングコンポーネン 

├ stores/           Reduxストア

├ @types.ts         型定義ファイル

├ App.tsx           ルーティング

├ index.tsx         入り口

└ util.ts           定数定義ファイル

### containers/

- ルーティング単位
- APIを叩く

### templates/

- ページ単位
- 検索やソート等、データ加工を担う
- useStyles不要
- 認証失敗ページや404ページはtemplates/
- 投稿フォームのmodal等はフルスクリーンでもtemplates/以下
- modalのopen/setOpen等、見た目に関係するstateはuseStateで所有可能

### organisms/

- 再利用しないコンポーネント
- Reduxストアにアクセス可能
- スタイルは自身でもつ。propsにclassNameは不要
- modalのopen/setOpen等、見た目に関係するstateはuseStateで所有可能
- 少し気持ち悪いけどHeader, BottomNavはここに

### molecules/

- 再利用するコンポーネント
- Reduxストアにアクセス可能
- modalのopen/setOpen等、見た目に関係するstateはuseStateで所有可能

### その他

- templates/ではuseStyles使わない
- ログインしているユーザーはcurrentUserで統一
- apiStatusは使わない。各statusを使う
- フォームはとりあえずRedux使わない。containerでuseStateする
- とりあえず今はレスポンシブデザインは考えない
