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

      case AppConstants.LIKE_TWEET:
        console.log('like tweet');
        break;

      case AppConstants.UNLIKE_TWEET:
      console.log('unlike tweet');
        break;
      case AppConstants.api.RECEIVE_TWEETS:

        _tweets = payload.tweets.concat(_tweets);
        sessionStorage.setItem('tweets', JSON.stringify(_tweets));
        break;
    }

    AppStore.emitChange();

  })
});

export default AppStore;
