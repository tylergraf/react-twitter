import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change'

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

  getCart(){
    return CartAPI.cartItems;
  },

  getCatalog(){
    return CartAPI.getCatalog();
  },

  getCartTotals(){
    return CartAPI.cartTotals();
  },

  dispatcherIndex: register( function( action ){
    switch(action.actionType){
      case AppConstants.LIKE_TWEET:
        CartAPI.addItem( action.item );
        break;
      case AppConstants.UNLIKE_TWEET:
        CartAPI.removeItem( action.item );
        break;

      case AppConstants.RETWEET_TWEET:
        CartAPI.increaseItem( action.item );
        break;

      case AppConstants.UNRETWEET_TWEET:
        CartAPI.decreaseItem( action.item );
        break;
    }

    AppStore.emitChange();

  })
});

export default AppStore;
