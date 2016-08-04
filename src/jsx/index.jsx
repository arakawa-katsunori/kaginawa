import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'

import selectedImages from './reducers/selectedImages'
import fetchedItems from './reducers/search'

import App from './components/App'
import Showcase from './components/Showcase'

const store = createStore(
  combineReducers({
    selectedImages: selectedImages,
    fetchedItems: fetchedItems,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(thunk)
  )
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='search'>
          <Route path=':imageId' component={Showcase}/>
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
