import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {routerReducer, routerMiddleware} from 'react-router-redux'

import reducers from '~/reducers'

import './recompose'

const history = createHistory()

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

export default () => ({
  history,
  store: createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    composeEnhancers(applyMiddleware(routerMiddleware(history))),
  ),
})
