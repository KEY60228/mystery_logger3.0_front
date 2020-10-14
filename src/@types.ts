export interface Product {
  id: number
  name: string
  contents: string|null
  image_name: string
  created_at: Date
  updated_at: Date|null
  reviews_count: number,
  avgRating: number|null,
  successRate: number|null,
  successCount: number,
}

export interface User {
  id: number
  account_id: string
  name: string
  profile: string
  image_name: string
  created_at: Date
  updated_at: Date|null
  reviews_count: number
  follows_count: number
  followers_count: number
  successRate: number|null
  wannaProducts_count: number
  likeReviews_count: number
}

export interface Review {
  id: number
  user_id: number
  product_id: number
  contents: string|null
  result: number
  clear_time: number|null
  rating: number|null
  joined_at: Date|null
  created_at: Date
  updated_at: Date|null
}

export interface ProductDetail extends Product {
  reviews: ReviewWithUser[]|null
}

export interface UserDetail extends User {
  reviews: ReviewWithProduct[]|null
  follows: User[]|null
  followers: User[]|null
  joinedProducts: Product[]|null
  wannaProducts: Product[]|null
  likeReviews: ReviewDetail[]|null
}

export interface ReviewWithUser extends Review {
  user: User
}

export interface ReviewWithProduct extends Review {
  product: Product
}

export interface ReviewDetail extends ReviewWithUser, ReviewWithProduct {
  
}