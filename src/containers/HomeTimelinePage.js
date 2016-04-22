import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { loadUser, loadStarred } from '../actions'
// import User from '../components/User'
// import Repo from '../components/Repo'
// import List from '../components/List'
import {register} from '../components/twitter/Tweet';
import Tweet from '../components/twitter/Tweet';
import {getTimeline,getHomeTimeline} from '../api/helpers';
import zip from 'lodash/array/zip'
import AppStore from '../stores/app-store'

function loadData(props) {
  const { login } = props
  loadUser('tylergraf', [ 'name' ])
  loadStarred('tylergraf')
}

class HomeTimelinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: {},
      repos: []
    }
    this._onChange = this._onChange.bind( this );

  }


  componentWillMount() {
    this.setState({tweets: AppStore.getTweets()});

    AppStore.addChangeListener( this._onChange );
  }

  componentWillUnmount() {
    AppStore.removeChangeListener( this._onChange );
  }

  _onChange() {
    this.setState({tweets: AppStore.getTweets()});
  }
  loadMore() {
    AppStore.getTweets(true);
  }
  // componentWillReceiveProps(nextProps) {
  //   AppStore.getTweets();
  // }


  render() {
    const {tweets} = this.state;
    var tweetsElement;

    if(tweets.length){
      tweetsElement = <div className="tweets">
          {tweets.map((tweet)=>{return (<Tweet tweet={tweet}></Tweet>)})}
        </div>;
    } else {
      tweetsElement = 'Loading...'
    }
    // const { starredRepos, starredRepoOwners, starredPagination } = this.props
    return (
      <div>
      <button type="button" className="btn" onClick={this.loadMore.bind(this)}>Load More</button>
      {tweetsElement}</div>
    )
  }
}
//
// HomeTimelinePage.propTypes = {
//   login: PropTypes.string.isRequired,
//   user: PropTypes.object,
//   starredPagination: PropTypes.object,
//   starredRepos: PropTypes.array.isRequired,
//   starredRepoOwners: PropTypes.array.isRequired,
//   loadUser: PropTypes.func.isRequired,
//   loadStarred: PropTypes.func.isRequired
// }

// function mapStateToProps(state) {
//   const { login } = state.router.params
//   const {
//     pagination: { starredByUser },
//     entities: { users, repos }
//   } = state
//
//   const starredPagination = starredByUser[login] || { ids: [] }
//   const starredRepos = starredPagination.ids.map(id => repos[id])
//   const starredRepoOwners = starredRepos.map(repo => users[repo.owner])
//
//   return {
//     login,
//     starredRepos,
//     starredRepoOwners,
//     starredPagination,
//     user: users[login]
//   }
// }

// export default connect(mapStateToProps, {
//   loadUser,
//   loadStarred
// })(HomeTimelinePage)

export default HomeTimelinePage;
