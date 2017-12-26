import React from 'react'
import {Provider} from 'react-redux'

import {ConnectedRouter} from 'react-router-redux'

import render from '~/utils/render'

import App from '~/components/App'
import config from '~/config'

import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles'
import {cyan, blueGrey} from 'material-ui/colors'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: blueGrey,
  },
})

const {store, history} = config()

const renderApp = () => render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
)

renderApp()

if (module.hot) {
  module.hot.accept('./components/App', renderApp)
}
