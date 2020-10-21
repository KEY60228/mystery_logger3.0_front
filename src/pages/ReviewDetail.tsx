import React, { FC } from 'react'

import { ReviewDetail as ReviewDetailInterface } from '../@types'
import { ReviewDetail as ReviewDetailTemp } from '../templates/ReviewDetail'

export const ReviewDetail: FC = () => {
  const review: ReviewDetailInterface = {
    id: 1,
    user_id: 1,
    product_id: 1,
    contents: '面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった面白かった',
    result: 1,
    clear_time: '78',
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
    product: {
      id: 8,
      name: '閉ざされた雪山からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'snowy_mountain.jpg',
      created_at: '2020/10/1 20:00:00',
      updated_at: null,
      reviews_count: 534,
      avgRating: 2.8,
      successRate: 0.99999,
      successCount: 421,
      organizer_id: 1,
      category_id: 1,
      category: {
        id: 1,
        name: '屋内型',
      },
      limitTime: '60',
      requiredTime: '120',
      minParty: 1,
      maxParty: 6,
      performances: [
        {
          id: 1,
          product_id: 8,
          venue_id: 1,
          date: null,
          time: null,
          created_at: '2020/10/1 20:00:00',
          updated_at: null,
          venue: {
            id: 1,
            name: '東新宿GUNKAN',
            address: '東京都新宿区',
            tel: '03-1234-5678',
            organizer_id: 1,
            created_at: '2020/10/1 20:00:00',
            updated_at: null,
          },
        }
      ],
      organizer: {
        id: 1,
        name: 'スクラップ',
        website: 'https://hogehoge',
        address: '東京都',
        tel: '0120-111-222',
        mail: 'scrup@aaa.com',
        establish: '2000',
        created_at: '2020/10/1 20:00:00',
        updated_at: null
      }
    }
  }

  return (
    <ReviewDetailTemp review={review} />
  )
}