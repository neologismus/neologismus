import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import App from '~/components/App'
import config from '~/config'

const { store } = config()

const renderApp = () => render(
  <AppContainer warnings={false}>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
)

renderApp()


if (module.hot) {
  module.hot.accept('./components/App', renderApp)
}
