import React, { Component, PropTypes } from 'react';
import {retweetTweet, unretweetTweet} from '../services/helpers';
import ReactTooltip from 'react-tooltip';
import {TiArrowRepeat} from 'react-icons/lib/ti';

export default class Retweet extends Component {
  constructor(props){
    super(props);

    this.state = {
      favoriteTransition: false
    }

    this.handleRetweet = this.handleRetweet.bind(this);
    this.handleUnretweet = this.handleUnretweet.bind(this);
  }

  handleRetweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide()
    this.props.tweet.retweeted = true;
    this.props.tweet.retweet_count++;
    this.setState({tweet: this.props.tweet});

    let id = this.props.tweet.id_str;
    retweetTweet(id)
      .then((tweet)=>{
        this.props.tweet.retweet_count = tweet.data.retweet_count;
        this.setState({tweet: this.props.tweet});
      })
      .catch((err)=>{
        this.props.tweet.retweeted = false;
        this.setState({tweet: this.props.tweet});
      });

  }

  handleUnretweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide()
    this.props.tweet.retweeted = false;
    this.props.tweet.retweet_count--;

    this.setState({tweet: this.props.tweet});

    let id = this.props.tweet.id_str;
    unretweetTweet(id)
      .then((tweet)=>{
        this.props.tweet.retweet_count = tweet.data.retweet_count;
        this.setState({tweet: this.props.tweet});
      })
      .catch((err)=>{
        this.props.tweet.retweeted = true;
        this.setState({tweet: this.props.tweet});
      });
  }

  render() {
    const retweetCount = (this.props.tweet.retweet_count > 0) ? this.props.tweet.retweet_count : '';
    var retweeted = this.props.tweet.retweeted;
    console.log(retweeted);
    if (retweeted) {
      retweeted = <TiArrowRepeat className="retweet-icon retweeted" data-tip="Unretweet this tweet" onClick={this.handleUnretweet}/>;
    } else {
      retweeted = <TiArrowRepeat className="retweet-icon" data-tip="Retweet this tweet" onClick={this.handleRetweet}/>;
    }
    return (
      <div className="retweet">
        {retweeted}
        <span>{retweetCount}</span>
      </div>
    )
  }
}
