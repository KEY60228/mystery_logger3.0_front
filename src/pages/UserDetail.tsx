import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { RootState } from '../stores/index'
import { UserDetail as UserDetailInterface } from '../@types'
import { UserDetail as UserDetailTemp} from '../templates/UserDetail'

export const UserDetail: FC = () => {
  interface Params {
    account_id: string
  }

  const { account_id } = useParams<Params>()
  const [user, setUser] = useState<UserDetailInterface|null>(null)

  const getUser = async() => {
    const response = await axios.get(`https://localhost:1443/v1/users/${account_id}`)

    if (response.status === 422) {
      console.log(response)
    }

    if (response.status === 200) {
      setUser(response.data)
    }
  }

  const currentUser = useSelector((state: RootState) => state.auth.user)
  const follow = async() => {
    if (currentUser && user) {
      await axios.put(
        'https://localhost:1443/v1/follow',
        {
          'following_id': currentUser.id,
          'followed_id': user.id,
        }
      )
    } else {
      return false
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <>
      { user &&
        <UserDetailTemp user={user} follow={follow} />
      }
      { !user &&
        <div>loading</div>
      }
    </>
  )
}