import React, { FC } from 'react'

import { ProductDetail as ProductDetailInterface } from '../@types'
import { ProductDetail as ProductDetailTemp } from '../templates/ProductDetail'

export const ProductDetail: FC = () => {
  const dummyProductDetail: ProductDetailInterface = {
    id: 8,
    name: '現実からの脱出',
    contents: '逃げ出せるか！？',
    image_name: 'snowy_mountain.jpg',
    created_at: '2020/10/1 20:00:00',
    updated_at: null,
    reviews_count: 534,
    avgRating: 2.8,
    successRate: 0.99999,
    successCount: 421,
    reviews: [
      {
        id: 1,
        user_id: 1,
        product_id: 1,
        contents: '面白かった',
        result: 1,
        clear_time: 78,
        rating: 2,
        joined_at: '2020/9/30',
        created_at: '2020-10-1 20:00:00',
        updated_at: null,
        user: {
          id: 3,
          account_id: 'guest2',
          name: 'GUEST2',
          profile: 'GUEST2です！ スクラップの脱出ゲームが好きです！ 今までおおよそ30公演ほど参加してきました！ 成功率は50%程です！ よろしくお願いします！',
          image_name: 'default.jpeg',
          created_at: '2020/10/1 20:00:00',
          updated_at: null,
          reviews_count: 1,
          follows_count: 0,
          followers_count: 0,
          successRate: null,
          wannaProducts_count: 1,
          likeReviews_count: 1,
        },
      },
      {
        id: 2,
        user_id: 1,
        product_id: 1,
        contents: '面白かった',
        result: 1,
        clear_time: null,
        rating: 2,
        joined_at: null,
        created_at: '2020/10/1 20:00:00',
        updated_at: null,
        user: {
          id: 3,
          account_id: 'guest2',
          name: 'GUEST2',
          profile: 'GUEST2です！ スクラップの脱出ゲームが好きです！ 今までおおよそ30公演ほど参加してきました！ 成功率は50%程です！ よろしくお願いします！',
          image_name: 'default.jpeg',
          created_at: '2020/10/1 20:00:00',
          updated_at: null,
          reviews_count: 1,
          follows_count: 0,
          followers_count: 0,
          successRate: null,
          wannaProducts_count: 1,
          likeReviews_count: 1,
        },
      }
    ],
  }

  return (
    <ProductDetailTemp product={dummyProductDetail} />
  )
}