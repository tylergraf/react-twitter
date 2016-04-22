import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
// import NewTweet from './NewTweet';


export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // <NewTweet />
    return (
      <header>
        <div className="header-upper">
          <h1>Twitters</h1>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/user">User</Link>
          <Link to="/user/lindseywayment">Lindsey</Link>
        </nav>
      </header>
    )
  }
}
