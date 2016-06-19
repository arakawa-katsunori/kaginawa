import React from 'react'
import { render } from 'react-dom'
import { provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import App from './components/App'
import Showcase from './components/Showcase'

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='search'>
        <Route path=':imageId' component={Showcase}/>
      </Route>
    </Route>
  </Router>
,document.getElementById('app'));
