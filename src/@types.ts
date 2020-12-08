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
    limitTime: string | null // 制限時間
    requiredTime: string | null // 必要時間
    minParty: number | null // 最小人数
    maxParty: number | null // 最大人数
    created_at: string // 作成時
    updated_at: string // 更新時

    reviews_count: number
    avg_rating: number | null
    success_rate: number | null
    success_count: number
    wannas_count: number
    category: Category
}

export interface User {
    id: number // 代理キー
    account_id: string // アカウントID
    name: string // アカウントネーム
    profile: string | null // プロフィール文
    image_name: string // ユーザー画像
    created_at: string // 作成時
    updated_at: string // 更新時

    reviews_count: number
    follows_id: number[]
    follows_count: number
    followers_id: number[]
    followers_count: number
    done_id: number[]
    wanna_id: number[]
    success_rate: number | null
    wannas_count: number
    review_likes_count: number
    like_reviews_id: number[]
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

    comments_count: number // 仮
    review_likes_count: number // 仮
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

export interface ReviewComment {
    id: number // 代理キー
    user_id: number // ユーザーID
    review_id: number // レビューID
    contents: string // コメント内容
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

// extends model
export interface ProductDetailWithoutReviews extends Product {
    performances: PerformanceWithVenue[]
    organizer: Organizer
}

export interface ProductDetail extends ProductDetailWithoutReviews {
    reviews: ReviewWithUser[] | null
}

export interface ReviewWithUser extends Review {
    user: User
}

export interface PerformanceWithVenue extends Performance {
    venue: Venue
}

export interface ReviewLikeDetail extends ReviewLike {
    review: ReviewDetail
}

export interface UserDetail extends User {
    reviews: ReviewWithProduct[] | null
    follows: User[] | null
    followers: User[] | null
    wannas: WannaWithProduct[] | null
    review_likes: ReviewLikeDetail[] | null
}

export interface ReviewWithProduct extends Review {
    product: ProductDetailWithoutReviews
}

export interface ReviewCommentDetail extends ReviewComment {
    user: User
}

export interface ReviewDetail extends ReviewWithUser, ReviewWithProduct {
    comments: ReviewCommentDetail[]
}

export interface OrganizerDetail extends Organizer {
    products: ProductDetail[]
    venues: Venue[]
}

export interface VenueDetail extends Venue {
    performances: PerformanceWithProduct[]
    organizer: Organizer
}

export interface PerformanceWithProduct extends Performance {
    product: ProductDetail
}

export interface PerformanceDetail extends PerformanceWithProduct, PerformanceWithVenue {}

export interface WannaWithProduct extends Wanna {
    product: Product
}

export interface AccompanyDetail extends Accompany {
    user: UserDetail
    performance: PerformanceDetail
}
