import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';
import CartAPI from '../api/CartAPI';
import TwitterAPI from '../api/TwitterAPI';

const CHANGE_EVENT = 'change'
var _tweets = [];

try{
  _tweets = JSON.parse(sessionStorage.getItem('tweets')) || [];
} catch(e){
  _tweets = [];
}
const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange(){
    this.emit( CHANGE_EVENT )
  },

  addChangeListener( callback ){
    this.on( CHANGE_EVENT, callback )
  },

  removeChangeListener( callback ){
    this.removeListener( CHANGE_EVENT, callback )
  },

  getTweets(breakCache){
    if(!_tweets.length || breakCache){
      let sinceId = JSON.parse(sessionStorage.getItem('tweets'));
      if(_tweets.length){
        sinceId = _tweets[0].id_str;
      }
      TwitterAPI.getTweets(sinceId)
        .then(tweets => {
          dispatch({actionType: AppConstants.api.RECEIVE_TWEETS, tweets});
        })
        // .catch(err => dispatch({AppConstants.api.ERROR, err));
    }
    return _tweets;
  },

  getCatalog(){
    return CartAPI.getCatalog();
  },

  getCartTotals(){
    return CartAPI.cartTotals();
  },

  dispatcherIndex: register( function( payload ){
    switch(payload.actionType){
      case AppConstants.ADD_ITEM:
        CartAPI.addItem( payload.item );
        break;
      case AppConstants.REMOVE_ITEM:
        CartAPI.removeItem( payload.item );
        break;

      case AppConstants.INCREASE_ITEM:
        CartAPI.increaseItem( payload.item );
        break;

      case AppConstants.DECREASE_ITEM:
        CartAPI.decreaseItem( payload.item );
        break;

      case AppConstants.WRITE_TWEET:
        TwitterAPI.writeTweet(payload.status, payload.replyId)
          .then(tweet => dispatch({actionType: AppConstants.api.RECEIVE_TWEETS, tweets: [tweet]}))
          .catch(err => console.log(err))

        break;

      case AppConstants.LIKE_TWEET:
        _tweets.forEach(tweet => {
          if(tweet.id_str === payload.id){
            tweet.favorited = true;
            tweet.favorite_count++;
          }
        });
        TwitterAPI.likeTweet(payload.id)
          .then(tweet => dispatch({actionType: AppConstants.api.UPDATE_TWEET, tweet}))
          .catch(err => console.log(err))

        break;

      case AppConstants.UNLIKE_TWEET:
        _tweets.forEach(tweet => {
          if(tweet.id_str === payload.id){
            tweet.favorited = false;
            tweet.favorite_count--;
          }
        });
        TwitterAPI.unlikeTweet(payload.id)
          .then(tweet => {
            dispatch({actionType: AppConstants.api.UPDATE_TWEET, tweet});
          }).catch(err => console.log(err))
        break;
      case AppConstants.RETWEET_TWEET:
        _tweets.forEach(tweet => {
          if(tweet.id_str === payload.id){
            tweet.retweeted = true;
            tweet.retweet_count++;
          }
        });
        TwitterAPI.retweetTweet(payload.id)
          .then(tweet => {
            console.log(tweet.retweeted);
            dispatch({actionType: AppConstants.api.UPDATE_TWEET, tweet});
          }).catch(err => console.log(err))

        break;

      case AppConstants.UNRETWEET_TWEET:
        _tweets.forEach(tweet => {
          if(tweet.id_str === payload.id){
            tweet.retweeted = false;
            tweet.retweet_count--;
          }
        });
        TwitterAPI.unretweetTweet(payload.id)
          .then(tweet => {
            dispatch({actionType: AppConstants.api.UPDATE_TWEET, tweet});
          }).catch(err => console.log(err))
        break;
      case AppConstants.api.RECEIVE_TWEETS:

        _tweets = payload.tweets.concat(_tweets);
        sessionStorage.setItem('tweets', JSON.stringify(_tweets));
        break;
      case AppConstants.api.UPDATE_TWEET:
        _tweets.forEach(t => {
          if(t.id_str === payload.tweet.id_str){
            Object.assign(t, payload.tweet);
          }
        });

        sessionStorage.setItem('tweets', JSON.stringify(_tweets));
        break;
    }

    AppStore.emitChange();

  })
});

export default AppStore;
