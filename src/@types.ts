// ORM
export interface Product {
    id: number
    name: string
    contents: string | null
    image_name: string
    created_at: string
    updated_at: string | null
    reviews_count: number
    avg_rating: number | null
    success_rate: number | null
    success_count: number
    wannas_count: number
    organizer_id: number
    category_id: number
    category: Category
    limitTime: string
    requiredTime: string
    minParty: number
    maxParty: number
}

export interface User {
    id: number
    account_id: string
    name: string
    profile: string
    image_name: string
    created_at: string
    updated_at: string | null
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
    id: number
    user_id: number
    product_id: number
    contents: string | null
    result: number
    clear_time: string | null
    rating: number
    joined_at: string | null
    comments_count: number // 仮
    review_likes_count: number // 仮
    retweet_count: number // 仮
    created_at: string
    updated_at: string | null
}

export interface Organizer {
    id: number
    name: string
    website: string
    address: string
    tel: string
    mail: string
    establish: string | null
    image_name: string
    company_name: string
    created_at: string
    updated_at: string | null
}

export interface Venue {
    id: number
    name: string
    address: string
    tel: string
    organizer_id: number
    created_at: string
    updated_at: string | null
}

export interface Performance {
    id: number
    product_id: number
    venue_id: number
    date: string | null
    time: string | null
    created_at: string
    updated_at: string | null
}

export interface Category {
    id: number
    name: string
    created_at: string
    updated_at: string | null
}

export interface Wanna {
    id: number
    user_id: number
    product_id: number
    created_at: string
    updated_at: string | null
}

export interface Comment {
    id: number
    user_id: number
    review_id: number
    contents: string
    created_at: string
    updated_at: string | null
}

export interface ReviewLike {
    id: number
    user_id: number
    review_id: number
    created_at: string
    updated_at: string | null
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

export interface CommentDetail extends Comment {
    user: User
}

export interface ReviewDetail extends ReviewWithUser, ReviewWithProduct {
    comments: CommentDetail[]
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

export interface WannaWithProduct extends Wanna {
    product: Product
}
