// ORM
export interface Product {
    id: number // 代理キー
    organizer_id: number // 主催団体ID
    category_id: number // カテゴリーID
    name: string // 作品名
    kana_name: string // 作品名読み
    phrase: string | null // 作品フレーズ
    website: string | null // 作品WEBページ
    image_name: string // 作品画像
    limitTime: number | null // 制限時間
    requiredTime: number | null // 必要時間
    minParty: number | null // 最小人数
    maxParty: number | null // 最大人数
    created_at: string // 作成時
    updated_at: string // 更新時
    avg_rating: number | null // 平均評価 0ならnullが返る
    success_count: number // 成功数
    na_count: number // 失敗数
    success_rate: number | null // 脱出成功率 有効回答が0ならnullが返る
    reviews_count: number // 投稿数
    wannas_count: number // 「行きたい」数
}

export interface User {
    id: number // 代理キー
    account_id: string // アカウントID
    name: string // アカウントネーム
    profile: string | null // プロフィール文
    image_name: string // ユーザー画像
    created_at: string // 作成時
    updated_at: string // 更新時
    follows_count: number // フォロー数
    follows_id: number[] // フォローしているユーザーのID
    followers_count: number // フォロワー数
    followers_id: number[] // フォローされているユーザーのID
    success_rate: number | null // 脱出成功率 有効回答が0ならnullが返る
    reviews_count: number // 投稿数
    done_id: number[] // 行った作品のID
    wannas_count: number // 「行きたい」数
    wanna_id: number[] // 「行きたい」作品のID
    like_reviews_count: number // LIKEしたレビューの数
    like_reviews_id: number[] // LIKEしたレビューのID
}

export interface Review {
    id: number // 代理キー
    user_id: number // ユーザーID
    product_id: number // 作品ID
    spoil: boolean // ネタバレフラグ (true:ネタバレあり false:なし)
    contents: string | null // レビュー内容
    result: number // 結果 (0:無回答 1:成功 2:失敗)
    rating: number // 評価
    joined_at: string | null // 参加日
    created_at: string // 作成時
    updated_at: string // 更新時
    review_comments_count: number // ついたコメントの数
    review_likes_count: number // ついたLIKEの数
    exposed_contents: string | null // レビュー内容 (ネタバレなし or 許可されたもの)

    retweet_count: number // 仮
}

export interface Organizer {
    id: number // 代理キー
    service_name: string // サービス名
    kana_service_name: string // サービス名読み
    company_name: string | null // 団体・企業名
    kana_company_name: string | null // 団体・企業名読み
    website: string | null // サイトURL
    image_name: string // 団体イメージ画像
    zipcode: string | null // 本拠地郵便番号
    addr_prefecture: string | null // 本拠地都道府県
    addr_city: string | null // 本拠地市区町村
    addr_block: string | null // 本拠地町域以下
    addr_building: string | null // 本拠地建屋以下
    tel: string | null // 代表電話番号
    mail: string | null // 代表メールアドレス
    created_at: string // 作成時
    updated_at: string // 更新時
}

export interface Venue {
    id: number // 代理キー
    organizer_id: number // 主催団体ID
    name: string // 会場名
    kana_name: string // 会場名読み
    zipcode: string | null // 郵便番号
    addr_prefecture: string | null // 都道府県
    addr_city: string | null // 市区町村
    addr_block: string | null // 町域以下
    addr_building: string | null // 建屋以下
    lat: string | null // 緯度
    long: string | null // 経度
    tel: string | null // 電話番号
    created_at: string // 作成時
    updated_at: string // 更新時
}

export interface Performance {
    id: number // 代理キー
    product_id: number // 作品ID
    venue_id: number // 会場ID
    active_id: number // 0:公演終了 1:公演中
    start_date: string | null // 公演開始日
    end_date: string | null // 公演終了日
    created_at: string // 作成時
    updated_at: string // 更新時
}

export interface Category {
    id: number // 代理キー
    name: string // カテゴリー名
    created_at: string // 作成時
    updated_at: string // 更新時
}

export interface Wanna {
    id: number // 代理キー
    user_id: number // ユーザーID
    product_id: number // 作品ID
    created_at: string // 作成時
    updated_at: string // 更新時
}

export interface ReviewLike {
    id: number // 代理キー
    user_id: number // ユーザーID
    review_id: number // レビューID
    created_at: string // 作成時
    updated_at: string // 更新時
}

export interface ReviewComment {
    id: number // 代理キー
    user_id: number // ユーザーID
    review_id: number // レビューID
    contents: string // コメント内容
    created_at: string // 作成時
    updated_at: string // 更新時
}

// export interface Follow {
//     id: number // 代理キー
//     following_id: number // フォローするユーザーID
//     followed_id: number // フォローされるユーザーID
//     created_at: string // 作成時
//     updated_at: string // 更新時
// }

export interface Accompany {
    id: number // 代理キー
    user_id: number // ユーザーID
    performance_id: number // 公演ID
    contents: number // 募集文
    created_at: string // 作成時
    updated_at: string // 更新時
}

// For TopPage, Search
export interface ProductIndex extends Product {
    category: Category
    organizer: Organizer
    performances: PerformanceWithVenue[]
}

// For ProductDetail
export interface ProductDetail extends Product {
    category: Category
    organizer: Organizer
    performances: PerformanceWithVenue[]
    reviews: ReviewWithUser[]
}

// For UserDetail
export interface UserDetail extends User {
    reviews: ReviewWithProductWithCategory[]
    wannas: WannaWithProduct[]
    follows: User[]
    followers: User[]
    review_likes: ReviewLikeWithReviewWithProductAndUser[]
}

// For ReviewDetail
export interface ReviewDetail extends Review {
    user: User
    product: ProductWithCategoryAndOrganizerAndPerformancesWithVenue
    review_comments: ReviewCommentWithUser[]
}

// For Timeline
export interface ReviewIndex extends Review {
    product: Product
    user: User
}

// For OrganizerDetail
export interface OrganizerDetail extends Organizer {
    products: ProductWithCategoryAndOrganizerAndPerformancesWithVenue[]
    venues: Venue[]
}

// For VenueDetail
export interface VenueDetail extends Venue {
    organizer: Organizer
    performances: PerformanceWithProductWithCategoryAndOrganizerAndPerformancesWithVenue[]
}

// For Accompanies
export interface AccompanyIndex extends Accompany {
    user: User
    performance: PerformanceWithVenueAndProduct
}

// For Auth
export interface CurrentUser {
    id: number // 代理キー
    account_id: string // アカウントID
    name: string // アカウントネーム
    follows_id: number[] // フォローしているユーザーのID
    followers_id: number[] // フォローされているユーザーのID
    done_id: number[] // 行った作品のID
    wanna_id: number[] // 「行きたい」作品のID
    like_reviews_id: number[] // LIKEしたレビューのID
}

// For Login
export interface LoginData {
    email: string
    password: string
}

// For Register
export interface RegisterData {
    name: string
    accountId: string
    password: string
    email: string
    preRegisterId: number
}

// For PostReview
export interface ReviewContents {
    spoil: boolean
    rating: number
    result: number
    joined_at: Date | null
    contents: string | null
}

// For User Profiles
export interface UserContents {
    name: string
    account_id: string
    profile: string
}

// extends model
interface PerformanceWithVenue extends Performance {
    venue: Venue
}

interface ReviewWithUser extends Review {
    user: User
}

interface ProductWithCategory extends Product {
    category: Category
}

interface WannaWithProduct extends Wanna {
    product: Product
}

interface ReviewCommentWithUser extends ReviewComment {
    user: User
}

interface PerformanceWithVenueAndProduct extends Performance {
    venue: Venue
    product: Product
}

interface ReviewWithUserAndProduct extends Review {
    user: User
    product: Product
}

interface ReviewWithProductWithCategory extends Review {
    product: ProductWithCategory
}

interface ReviewLikeWithReviewWithProductAndUser extends ReviewLike {
    review: ReviewWithUserAndProduct
}

interface ProductWithCategoryAndOrganizerAndPerformancesWithVenue
    extends Product {
    category: Category
    organizer: Organizer
    performances: PerformanceWithVenue[]
}

interface PerformanceWithProductWithCategoryAndOrganizerAndPerformancesWithVenue
    extends Performance {
    product: ProductWithCategoryAndOrganizerAndPerformancesWithVenue
}
