import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { setUser } from '../stores/auth'
import { Login as LoginTemp } from '../templates/Login'

export const Login: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const login = async() => {
    const response = await axios.post(
      'https://localhost:1443/v1/login',
      { 'email': email, 'password': password },
    )

    if (response.status === 422) {
      // エラーハンドリング
      return
    }
    
    dispatch(setUser(response.data))
    
    if (response.status === 200) {
      history.push('/')
    }
  }

  return (
    <LoginTemp 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      login={login}
    />
  )
}