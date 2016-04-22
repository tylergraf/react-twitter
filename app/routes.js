import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Header from './components/Header'
import HomeTimelinePage from './containers/HomeTimelinePage'
import UserTimelinePage from './containers/UserTimelinePage'
debugger;
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeTimelinePage} />
    <Route path="user" component={UserTimelinePage}>
      <Route path=":username" component={UserTimelinePage} />
    </Route>
  </Route>
)
