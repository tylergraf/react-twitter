import React, { Component, PropTypes } from 'react';
import {favoriteTweet, unFavoriteTweet} from '../../api/helpers';
import ReactTooltip from 'react-tooltip';
import {TiHeartOutline, TiHeartFullOutline} from 'react-icons/lib/ti';
import AppActions from '../../actions/app-actions'

export default (props) => {
  var favorited = props.tweet.favorited,
      favoriteCount = (props.tweet.favorite_count > 0) ? props.tweet.favorite_count : '',
      favoriteClasses = (props.favoriteTransition) ? 'on favorite-icon' : 'favorite-icon';

  if (favorited) {
    favorited = <TiHeartFullOutline className={favoriteClasses} data-tip="Unfavorite this tweet" onClick={props.unlikeHandler}/>;
  } else {
    favorited = <TiHeartOutline className={favoriteClasses} data-tip="Favorite this tweet" onClick={props.likeHandler}/>;
  }


  return (
    <div className="favorite">
      {favorited}
      <span>{favoriteCount}</span>
    </div>
  )
}
// export default class Favorite extends Component {
//   constructor(props){
//     super(props);
//
//     this.state = {
//       favoriteTransition: false
//     }
//
//     this.handleUnfavorite = this.handleUnfavorite.bind(this);
//     this.handleFavorite = this.handleFavorite.bind(this);
//   }
//
//   handleFavorite(evt){
//     evt.stopPropagation();
//     ReactTooltip.hide()
//     AppActions.likeTweet(this.props.tweet);
//     // return;
//     // this.props.tweet.favorited = true;
//     // this.props.tweet.favorite_count++;
//     //
//     // this.setState({tweet: this.props.tweet});
//     //
//     // this.setState({favoriteTransition: true});
//     // setTimeout(()=>this.setState({favoriteTransition: false}),100);
//     // let id = this.props.tweet.id_str;
//     // favoriteTweet(id)
//     //   .then((tweet)=>{
//     //     this.props.tweet.favorite_count = tweet.data.favorite_count;
//     //     this.setState({tweet: this.props.tweet});
//     //   })
//     //   .catch((err)=>{
//     //     this.props.tweet.favorited = false;
//     //     this.setState({tweet: this.props.tweet});
//     //   });
//
//   }
//
//   handleUnfavorite(evt){
//     evt.stopPropagation();
//     ReactTooltip.hide()
//     this.props.tweet.favorited = false;
//     this.props.tweet.favorite_count--;
//
//     this.setState({tweet: this.props.tweet});
//
//     this.setState({favoriteTransition: true});
//     setTimeout(()=>this.setState({favoriteTransition: false}),100);
//     let id = this.props.tweet.id_str;
//     unFavoriteTweet(id)
//       .then((tweet)=>{
//         this.props.tweet.favorite_count = tweet.data.favorite_count;
//         this.setState({tweet: this.props.tweet});
//       })
//       .catch((err)=>{
//         this.props.tweet.favorited = true;
//         this.setState({tweet: this.props.tweet});
//       });
//   }
//
//   render() {
//
//     var favorited = this.props.tweet.favorited,
//         favoriteCount = (this.props.tweet.favorite_count > 0) ? this.props.tweet.favorite_count : '',
//         favoriteClasses = (this.state.favoriteTransition) ? 'on favorite-icon' : 'favorite-icon';
//
//     if (favorited) {
//       favorited = <TiHeartFullOutline className={favoriteClasses} data-tip="Unfavorite this tweet" onClick={this.handleUnfavorite}/>;
//     } else {
//       favorited = <TiHeartOutline className={favoriteClasses} data-tip="Favorite this tweet" onClick={this.handleFavorite}/>;
//     }
//
//
//     return (
//       <div className="favorite">
//         {favorited}
//         <span>{favoriteCount}</span>
//       </div>
//     )
//   }
// }
