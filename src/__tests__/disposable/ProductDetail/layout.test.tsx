// import * as React from 'react'
// import { screen, render } from '@testing-library/react'

// import { ProductDetailTemplate } from '../../../disposable/ProductDetail/layout'

// import { ProductDetail, ReviewContents } from '../../../@types'

// describe('ProductDetailTemplate', () => {
//     it('Should render product information', () => {
//         const product: ProductDetail = {
//             id: 1,
//             organizer_id: 1,
//             category_id: 1,
//             name: 'テストからの脱出',
//             kana_name: 'てすとからのだっしゅつ',
//             phrase: 'がんばれ！',
//             website: null,
//             image_name: 'noimage.jpg',
//             limitTime: null,
//             requiredTime: null,
//             minParty: null,
//             maxParty: null,
//             created_at: '2021/1/1 0:00:00',
//             updated_at: '2021/3/1 0:00:00',
//             avg_rating: 2,
//             success_count: 2,
//             na_count: 2,
//             success_rate: 0.5,
//             reviews_count: 4,
//             wannas_count: 0,
//             category: {
//                 id: 1,
//                 name: 'ルーム型',
//                 created_at: '2021/1/1 0:00:00',
//                 updated_at: '2021/1/1 0:00:00',
//             },
//             organizer: {
//                 id: 1,
//                 service_name: 'リアル脱出ゲーム',
//                 kana_service_name: 'りあるだっしゅつげーむ',
//                 company_name: null,
//                 kana_company_name: null,
//                 website: null,
//                 image_name: 'noimage.jpeg',
//                 zipcode: null,
//                 addr_prefecture: null,
//                 addr_city: null,
//                 addr_block: null,
//                 addr_building: null,
//                 tel: null,
//                 mail: null,
//                 created_at: '2021/1/1 0:00:00',
//                 updated_at: '2021/1/1 0:00:00',
//             },
//             performances: [
//                 {
//                     id: 1,
//                     product_id: 1,
//                     venue_id: 1,
//                     active_id: 1,
//                     start_date: null,
//                     end_date: null,
//                     created_at: '2021/1/1 0:00:00',
//                     updated_at: '2021/1/1 0:00:00',
//                     venue: {
//                         id: 1,
//                         organizer_id: 1,
//                         name: '新宿店',
//                         kana_name: 'しんじゅくてん',
//                         zipcode: null,
//                         addr_prefecture: null,
//                         addr_city: null,
//                         addr_block: null,
//                         addr_building: null,
//                         lat: null,
//                         long: null,
//                         tel: null,
//                         created_at: '2021/1/1 0:00:00',
//                         updated_at: '2021/1/1 0:00:00',
//                     }
//                 }
//             ],
//             reviews: [
//                 {
//                     id: 1,
//                     user_id: 1,
//                     product_id: 1,
//                     spoil: false,
//                     contents: null,
//                     result: 0,
//                     rating: 0,
//                     joined_at: null,
//                     created_at: '2021/3/1 12:00:00',
//                     updated_at: '2021/3/1 12:00:00',
//                     review_comments_count: 0,
//                     review_likes_count: 0,
//                     exposed_contents: null,
//                     retweet_count: 0,
//                     user: {
//                         id: 1,
//                         account_id: 'guest',
//                         name: 'GUEST',
//                         profile: null,
//                         image_name: 'default.jpeg',
//                         created_at: '2021/2/1 12:00:00',
//                         updated_at: '2021/2/1 12:00:00',
//                         follows_count: 0,
//                         follows_id: [],
//                         followers_count: 0,
//                         followers_id: [],
//                         success_rate: null,
//                         reviews_count: 0,
//                         done_id: [],
//                         wannas_count: 0,
//                         wanna_id: [],
//                         like_reviews_count: 0,
//                         like_reviews_id: [],
//                     }
//                 },
//             ]
//         }
//         const reviewContents: ReviewContents = {
//             spoil: false,
//             result: 0,
//             rating: 0,
//             joined_at: null,
//             contents: null,
//         }

//         render(
//             <ProductDetailTemplate
//                 product={product}
//                 formOpen={false}
//                 setFormOpen={jest.fn()}
//                 reviewContents={reviewContents}
//                 setReviewContents={jest.fn()}
//                 editReview={jest.fn()}
//                 postReview={jest.fn()}
//                 deleteReview={jest.fn()}
//                 follow={jest.fn()}
//                 unfollow={jest.fn()}
//                 wanna={jest.fn()}
//                 unwanna={jest.fn()}
//                 likeReview={jest.fn()}
//                 unlikeReview={jest.fn()}
//             />
//         )

//         expect(screen.getByText('テスト')).toBeTruthy();
//     })
// })