import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {favoriteTweet, unFavoriteTweet} from '../services/helpers';
import TweetText from './TweetText';
import Favorite from './Favorite';
import Retweet from './Retweet';
import Moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import {TiArrowBack} from 'react-icons/lib/ti';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    maxWidth: '500',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Tweet extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    const { text, user, created_at, extended_entities} = this.props.tweet;

    let img;

    if(extended_entities){
      img = (
        <div className="tweet-img">
          <a href={extended_entities.media[0].url}>
            <img src={extended_entities.media[0].media_url} alt=""/>
          </a>
        </div>
      );
    } else {
      img = '';
    }

    return (
      <div className="tweet" onClick={this.openModal}>
        <ReactTooltip effect="solid" delayShow={300} />
        <div className="avatar">
          <img src={user.profile_image_url} alt={user.screen_name} />
        </div>
        <div className="tweet-content">
          <div className="user">
            <h3 className="name"><Link to={`/user/${user.screen_name}`}>{user.name}</Link></h3>
            <Link to={`/user/${user.screen_name}`} className="username">@{user.screen_name}</Link>
            <span>&nbsp;•&nbsp;</span>
            <div>
              <a href="" className="tweet-date" data-tip={Moment(created_at).format('HH:mma - MMM DD YYYY')}>{Moment(created_at).fromNow()}</a>
            </div>
          </div>
          <TweetText tweet={this.props.tweet}></TweetText>
          {img}
          <footer className="tweet-footer">
            <div className="reply">
              <TiArrowBack className="reply-icon" data-tip="Reply to this tweet"/>
            </div>
            <Favorite tweet={this.props.tweet} />
            <Retweet tweet={this.props.tweet} />

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles} >

              <div className="tweet-content">
                <div className="user">
                  <h3 className="name"><Link to={`/user/${user.screen_name}`}>{user.name}</Link></h3>
                  <Link to={`/user/${user.screen_name}`} className="username">@{user.screen_name}</Link>
                  <span>&nbsp;•&nbsp;</span>
                  <div>
                    <a href="" className="tweet-date" data-tip={Moment(created_at).format('HH:mma - MMM DD YYYY')}>{Moment(created_at).fromNow()}</a>
                  </div>
                </div>
                <TweetText tweet={this.props.tweet}></TweetText>
                {img}
              </div>
              <button onClick={this.closeModal}>close</button>
            </Modal>
          </footer>
        </div>
      </div>
    )
  }
}

// Tweet.propTypes = {
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//     name: PropTypes.string
//   }).isRequired
// }
