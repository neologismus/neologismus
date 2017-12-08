import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import reducers from '~/reducers'
import epics from '~/epics'

import './recompose'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

export default () => ({
  store: createStore(
    combineReducers(reducers),
    composeEnhancers(
      applyMiddleware(
        // createEpicMiddleware(epics),
      ),
    ),
  ),
})
