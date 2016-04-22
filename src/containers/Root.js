import React from 'react';
import HomeTimelinePage from './HomeTimelinePage';
// import Cart from './cart/app-cart';
// import CatalogDetail from './product/app-catalogdetail';
import Template from './Template';
import { Router, Route, IndexRoute } from 'react-router';

export default () => {
  // <Route path="item/:item" component={ CatalogDetail } />
    return (
        <Router>
          <Route path="/" component={ Template }>
            <IndexRoute component={HomeTimelinePage} />

          </Route>
        </Router>
    );
};
// import React from 'react'
// import { Route, IndexRoute } from 'react-router'
// import App from './containers/App'
// import Header from './components/Header'
// import HomeTimelinePage from './containers/HomeTimelinePage'
// import UserTimelinePage from './containers/UserTimelinePage'
// debugger;
// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={HomeTimelinePage} />
//     <Route path="user" component={UserTimelinePage}>
//       <Route path=":username" component={UserTimelinePage} />
//     </Route>
//   </Route>
// )
