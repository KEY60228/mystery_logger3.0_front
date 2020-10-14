import React, { FC, useState } from 'react'
import axios from 'axios'

import { UserDetail as UserDetailInterface } from '../@types'
import { UserDetail as UserDetailTemp} from '../templates/UserDetail'

export const UserDetail: FC = () => {
  // 仮
  const dummyUser: UserDetailInterface = {
    id: 3,
    account_id: 'guest2',
    name: 'GUEST2',
    profile: 'GUEST2です！ スクラップの脱出ゲームが好きです！ 今までおおよそ30公演ほど参加してきました！ 成功率は50%程です！ よろしくお願いします！',
    image_name: 'default.jpeg',
    created_at: new Date('2020/10/1 20:00:00'),
    updated_at: null,
    reviews_count: 1,
    follows_count: 0,
    followers_count: 0,
    successRate: null,
    wannaProducts_count: 4,
    likeReviews_count: 1,

    reviews: null,
    follows: null,
    followers: null,
    joinedProducts: [
      {
      id: 1,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'demon_castle.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 324,
      avgRating: 2.5,
      successRate: 0.134,
      successCount: 144,
      },
      {
      id: 2,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'demon_castle2.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 41,
      avgRating: 4.2,
      successRate: 0.2343,
      successCount: 123,
    },
    {
      id: 3,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'night_mystery_hotel.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 41,
      avgRating: 3,
      successRate: 1,
      successCount: 1245,
      },
      {
      id: 4,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'radio_studio.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 534,
      avgRating: 2.8,
      successRate: 0.99999,
      successCount: 421,
      },
    ],
    wannaProducts: [
      {
      id: 5,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'wonderland.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 324,
      avgRating: 2.5,
      successRate: 0.134,
      successCount: 144,
      },
      {
      id: 6,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'vampire_hotel.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 41,
      avgRating: 4.2,
      successRate: 0.2343,
      successCount: 123,
      },
      {
      id: 7,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'radio_studio.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 123,
      avgRating: 3,
      successRate: 1,
      successCount: 1245,
      },
      {
      id: 8,
      name: '現実からの脱出',
      contents: '逃げ出せるか！？',
      image_name: 'snowy_mountain.jpg',
      created_at: new Date('2020/10/1 20:00:00'),
      updated_at: null,
      reviews_count: 534,
      avgRating: 2.8,
      successRate: 0.99999,
      successCount: 421,
      },
    ],
    likeReviews: [
      {
        id: 1,
        user_id: 1,
        product_id: 1,
        contents: '面白かった',
        result: 1,
        clear_time: null,
        rating: 2,
        joined_at: null,
        created_at: new Date('2020/10/1 20:00:00'),
        updated_at: null,
        user: {
          id: 3,
          account_id: 'guest2',
          name: 'GUEST2',
          profile: 'GUEST2です！ スクラップの脱出ゲームが好きです！ 今までおおよそ30公演ほど参加してきました！ 成功率は50%程です！ よろしくお願いします！',
          image_name: 'default.jpeg',
          created_at: new Date('2020/10/1 20:00:00'),
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
          name: '現実からの脱出',
          contents: '逃げ出せるか！？',
          image_name: 'snowy_mountain.jpg',
          created_at: new Date('2020/10/1 20:00:00'),
          updated_at: null,
          reviews_count: 534,
          avgRating: 2.8,
          successRate: 0.99999,
          successCount: 421,
        },
      }
    ],
  }
  const [user, setUser] = useState<UserDetailInterface|null>(dummyUser)

  return (
    <>
      { !user &&
        <div/>
      }
      { user &&
        <UserDetailTemp user={user} />
      }
    </>
  )
}