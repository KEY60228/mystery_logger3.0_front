import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './App'
import store from './stores/index'
import { theme } from './theme'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme} >
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('app'),
)
