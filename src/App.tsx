import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact><h1>App</h1></Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App