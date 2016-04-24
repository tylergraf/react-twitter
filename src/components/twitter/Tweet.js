import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {favoriteTweet, unFavoriteTweet} from '../../api/helpers';
import TweetText from './TweetText';
import Favorite from './Favorite';
import Retweet from './Retweet';
import Moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import {TiArrowRepeat} from 'react-icons/lib/ti';
import AppActions from '../../actions/app-actions';
import WriteTweet from './WriteTweet';

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

  likeTweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide();
    AppActions.likeTweet(this.props.tweet.id_str);
  }
  unlikeTweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide();
    AppActions.unlikeTweet(this.props.tweet.id_str);
  }
  retweetTweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide();
    AppActions.retweetTweet(this.props.tweet.id_str);
  }
  unretweetTweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide();
    AppActions.unretweetTweet(this.props.tweet.id_str);
  }
  render() {
    const isRetweet = this.props.tweet.is_quote_status;

    if(isRetweet){
      var retweetedBy = (<div className="retweeted-by">
        <TiArrowRepeat />
        <div>Retweeted by {this.props.tweet.user.name}</div>
      </div>);
    }


    if(this.props.tweet.retweeted_status){
      var { text, user, created_at, extended_entities} = this.props.tweet.retweeted_status;
    } else if(this.props.tweet.quoted_status){
      var { text, user, created_at, extended_entities} = this.props.tweet.quoted_status;
    } else {
      var { text, user, created_at, extended_entities} = this.props.tweet;
    }

    //
    // if(this.props.tweet.is_quote_status){
    //   debugger;
    // }
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
      <div className="tweet-wrapper" onClick={this.openModal}>
        {retweetedBy}
        <div className="tweet">
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
                <WriteTweet replyTweet={this.props.tweet}/>
              </div>
              <Favorite likeHandler={this.likeTweet.bind(this)} unlikeHandler={this.unlikeTweet.bind(this)} tweet={this.props.tweet} />
              <Retweet retweetHandler={this.retweetTweet.bind(this)} unretweetHandler={this.unretweetTweet.bind(this)} tweet={this.props.tweet} />

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
