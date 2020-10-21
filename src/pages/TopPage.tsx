import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'

import { Product } from '../@types'
import { TopPage as TPTemp} from '../templates/TopPage'

export const TopPage: FC = () => {
  // const products: Product[] = [
  //   {
  //     id: 1,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'demon_castle.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 324,
  //     avgRating: 2.5,
  //     successRate: 0.134,
  //     successCount: 144,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 2,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'demon_castle2.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 41,
  //     avgRating: 4.2,
  //     successRate: 0.2343,
  //     successCount: 123,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 3,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'night_mystery_hotel.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 123,
  //     avgRating: 3,
  //     successRate: 1,
  //     successCount: 1245,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 4,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'radio_studio.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 534,
  //     avgRating: 2.8,
  //     successRate: 0.99999,
  //     successCount: 421,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 5,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'snowy_mountain.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 812,
  //     avgRating: 4.1,
  //     successRate: 0.57,
  //     successCount: 438,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 6,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'sunken_ship.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 4725,
  //     avgRating: 3.3,
  //     successRate: 0.721,
  //     successCount: 834,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 7,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'vampire_hotel.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 572,
  //     avgRating: 0.1,
  //     successRate: 0.751,
  //     successCount: 872,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  //   {
  //     id: 8,
  //     name: '現実からの脱出',
  //     contents: '逃げ出せるか！？',
  //     image_name: 'wonderland.jpg',
  //     created_at: '2020/10/1 20:00:00',
  //     updated_at: null,
  //     reviews_count: 1242,
  //     avgRating: 5.0,
  //     successRate: 0.122,
  //     successCount: 581,
  //     organizer_id: 1,
  //     category_id: 1,
  //     category: {
  //       id: 1,
  //       name: '屋内型',
  //     },
  //     limitTime: '60',
  //     requiredTime: '120',
  //     minParty: 1,
  //     maxParty: 6,
  //   },
  // ]

  const [products, setProducts] = useState<Product[]|null>(null)
  const getProducts = async() => {
    const response = await axios.get('https://localhost:1443/v1/products')

    if (response.status === 422) {
      console.log(response)
    }

    if (response.status === 200) {
      setProducts(response.data)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      { products &&
        <TPTemp products={products} />
      }
      { !products &&
        <div>loading</div>
      }
    </>
  )
}