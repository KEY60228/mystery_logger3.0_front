import React, { FC, useState } from 'react'
import axios from 'axios'

import { PreRegister as PreRegisterTemp } from '../templates/PreRegister'

export const PreRegister: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const preRegister = async() => {
    // 仮登録処理
    const response = await axios.post(
      'https://localhost:1443/v1/preregister',
      {email: email}
    )

    if (response.status === 422) {
      // エラーハンドリング
    }

    // モーダル
    setOpen(true)
  }

  return (
    <PreRegisterTemp
      email={email}
      setEmail={setEmail}
      open={open}
      setOpen={setOpen}
      preRegister={preRegister}
    />
  )
}