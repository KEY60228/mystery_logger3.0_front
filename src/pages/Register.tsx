import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import { setUser } from '../stores/auth'
import { Register as RegisterTemp } from '../templates/Register'
import { FailVerify as FailVerifyTemp } from '../templates/FailVerify'

export const Register: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const query = queryString.parse(useLocation().search);
  
  const [accountId, setAccountId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [preRegisterId, setPreRegisterId] = useState<number>(0)
  const [status, setStatus] = useState<number>(0)

  const verify = async() => {
    // メール認証処理
    const response = await axios.post(
      'https://localhost:1443/v1/register/verify',
      {token: query.token}
    )

    if (response.status === 422) {
      // エラーハンドリング
      setStatus(422)
    }

    if (response.status === 200) {
      setEmail(response.data.email)
      setPreRegisterId(response.data.pre_register_id)
      setStatus(200)
    }
  }

  const register = async() => {
    const data = {
      'account_id': accountId,
      'email': email,
      'name': name,
      'password': password,
      'password_confirmation': passwordConfirmation,
      'pre_register_id': preRegisterId,
    }

    const response = await axios.post(
      'https://localhost:1443/v1/register',
      data
    )

    if (response.status === 422) {
      // エラーハンドリング
    }

    dispatch(setUser(response.data))

    if (response.status === 201) {
      history.push('/')
    }
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <>
      { status === 200 &&
        <RegisterTemp 
          accountId={accountId}
          setAccountId={setAccountId}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          register={register}
        />
      }
      { status === 422 &&
        <FailVerifyTemp />
      }
    </>
  )
}