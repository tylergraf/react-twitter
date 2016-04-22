import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../actions'
import User from '../components/User'
import Repo from '../components/Repo'
import List from '../components/List'
import Tweet from '../components/Tweet'
import {getTimeline,getHomeTimeline} from '../services/helpers';
import zip from 'lodash/array/zip'

function loadData(props) {
  const { login } = props
  loadUser('tylergraf', [ 'name' ])
  loadStarred('tylergraf')
}

class UserTimelinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    }
    // this.renderRepo = this.renderRepo.bind(this)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }
  //
  componentWillMount() {
    let username = this.props.params.username;

    getTimeline(username)
      .then(function(data){
        let tweets = data.tweets;
        console.log(tweets);
        this.setState({
          tweets: tweets
        })
      }.bind(this))
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.login !== this.props.login) {
  //     loadData(nextProps)
  //   }
  // }
  //
  // handleLoadMoreClick() {
  //   this.props.loadStarred(this.props.login, true)
  // }
  //
  // renderRepo([ repo, owner ]) {
  //   return (
  //     <Repo repo={repo}
  //           owner={owner}
  //           key={repo.fullName} />
  //   )
  // }

  render() {
    const {tweets} = this.state

    // const { starredRepos, starredRepoOwners, starredPagination } = this.props
    return (
      <div>
        <div className="tweets">
        {
          tweets.map((tweet)=>{
            return (
              <Tweet tweet={tweet}></Tweet>
            )
          })
        }
        </div>

      </div>
    )
  }
}
//
// UserTimelinePage.propTypes = {
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
// })(UserTimelinePage)

export default connect()(UserTimelinePage)
