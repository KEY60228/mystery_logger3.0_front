export interface Product {
  id: number
  name: string
  contents: string|null
  image_name: string
  created_at: Date
  updated_at: Date|null
  reviews: Review[]
  reviews_count: number,
  avgRating: number|null,
  successRate: number|null,
  successCount: number,
}

export interface User {
  id: number
  account_id: string
  name: string
  image_name: string
  created_at: Date
  updated_at: Date|null
  reviews: Review[]
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
  user: User
  product: Product
}