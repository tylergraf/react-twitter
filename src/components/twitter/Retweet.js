import React, { Component, PropTypes } from 'react';
import {retweetTweet, unretweetTweet} from '../../api/helpers';
import ReactTooltip from 'react-tooltip';
import {TiArrowRepeat} from 'react-icons/lib/ti';

export default (props) => {
  const retweetCount = (props.tweet.retweet_count > 0) ? props.tweet.retweet_count : '';
  var retweeted = props.tweet.retweeted;

  if (retweeted) {
    retweeted = <TiArrowRepeat className="retweet-icon retweeted" data-tip="Unretweet this tweet" onClick={props.unretweetHandler}/>;
  } else {
    retweeted = <TiArrowRepeat className="retweet-icon" data-tip="Retweet this tweet" onClick={props.retweetHandler}/>;
  }
  return (
    <div className="retweet">
      {retweeted}
      <span>{retweetCount}</span>
    </div>
  )
}
