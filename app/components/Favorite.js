import React, { Component, PropTypes } from 'react';
import {favoriteTweet, unFavoriteTweet} from '../services/helpers';
import ReactTooltip from 'react-tooltip';
import {TiHeartOutline, TiHeartFullOutline} from 'react-icons/lib/ti';

export default class Favorite extends Component {
  constructor(props){
    super(props);

    this.state = {
      favoriteTransition: false
    }

    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  handleFavorite(evt){
    evt.stopPropagation();
    ReactTooltip.hide()
    this.props.tweet.favorited = true;
    this.props.tweet.favorite_count++;

    this.setState({tweet: this.props.tweet});

    this.setState({favoriteTransition: true});
    setTimeout(()=>this.setState({favoriteTransition: false}),100);
    let id = this.props.tweet.id_str;
    favoriteTweet(id)
      .then((tweet)=>{
        this.props.tweet.favorite_count = tweet.data.favorite_count;
        this.setState({tweet: this.props.tweet});
      })
      .catch((err)=>{
        this.props.tweet.favorited = false;
        this.setState({tweet: this.props.tweet});
      });

  }

  handleUnfavorite(evt){
    evt.stopPropagation();
    ReactTooltip.hide()
    this.props.tweet.favorited = false;
    this.props.tweet.favorite_count--;

    this.setState({tweet: this.props.tweet});

    this.setState({favoriteTransition: true});
    setTimeout(()=>this.setState({favoriteTransition: false}),100);
    let id = this.props.tweet.id_str;
    unFavoriteTweet(id)
      .then((tweet)=>{
        this.props.tweet.favorite_count = tweet.data.favorite_count;
        this.setState({tweet: this.props.tweet});
      })
      .catch((err)=>{
        this.props.tweet.favorited = true;
        this.setState({tweet: this.props.tweet});
      });
  }

  render() {

    var favorited = this.props.tweet.favorited,
        favoriteCount = (this.props.tweet.favorite_count > 0) ? this.props.tweet.favorite_count : '',
        favoriteClasses = (this.state.favoriteTransition) ? 'on favorite-icon' : 'favorite-icon';

    if (favorited) {
      favorited = <TiHeartFullOutline className={favoriteClasses} data-tip="Unfavorite this tweet" onClick={this.handleUnfavorite}/>;
    } else {
      favorited = <TiHeartOutline className={favoriteClasses} data-tip="Favorite this tweet" onClick={this.handleFavorite}/>;
    }


    return (
      <div className="favorite">
        {favorited}
        <span>{favoriteCount}</span>
      </div>
    )
  }
}
