import React, { Component, PropTypes } from 'react'
// import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// import { ReduxRouter } from 'redux-router'
// import DevTools from './DevTools'
import ReactTooltip from 'react-tooltip';
import HomeTimelinePage from './HomeTimelinePage';
import UserTimelinePage from './UserTimelinePage';
import App from './App';

export default class Root extends Component {
  render() {
    // const { store } = this.props
    // <DevTools />
    // <ReduxRouter />
    return (
      // <Provider store={store}>
        // <div>
          <Router history={browserHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={HomeTimelinePage} />
              <Route path="user" component={UserTimelinePage}>
                <Route path=":username" component={UserTimelinePage} />
              </Route>
            </Route>
          </Router>
        // </div>
      // </Provider>
    )
  }
}

// Root.propTypes = {
//   store: PropTypes.object.isRequired
// }
