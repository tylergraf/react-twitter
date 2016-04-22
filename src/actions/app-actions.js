import AppConstants from '../constants/app-constants';
import { dispatch, register} from '../dispatchers/app-dispatcher';

export default {
    addItem( item ){
        dispatch({
            actionType: AppConstants.ADD_ITEM,
            item: item
        } )
    },
    removeItem( item ){
        dispatch({
            actionType: AppConstants.REMOVE_ITEM,
            item: item
        } )
    },
    increaseItem( item ){
        dispatch({
            actionType: AppConstants.INCREASE_ITEM,
            item: item
        } )
    },
    decreaseItem( item ){
        dispatch({
            actionType: AppConstants.DECREASE_ITEM,
            item: item
        } )
    },
    likeTweet(id){
      dispatch({actionType: AppConstants.LIKE_TWEET, id})
    },
    unlikeTweet(id){
      dispatch({actionType: AppConstants.UNLIKE_TWEET, id})
    },
    retweetTweet(id){
      dispatch({actionType: AppConstants.RETWEET_TWEET, id})
    },
    unretweetTweet(id){
      dispatch({actionType: AppConstants.UNRETWEET_TWEET, id})
    }
}
