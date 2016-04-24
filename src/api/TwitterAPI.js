import axios from 'axios';
import * as url from 'url';
import qs from 'query-string';

const twitterBase = `${window.location.origin}/api/proxy`;


const CartAPI = {
    catalog: [],
    cartItems: [],
    removeItem( item ) {
        this.cartItems.splice( this.cartItems.findIndex( i => i === item ), 1 );
    },
    findCartItem( item ) {
        return this.cartItems.find( cartItem => cartItem.id === item.id )
    },
    increaseItem( item )  {item.qty++},
    decreaseItem( item ) {
        item.qty--;
        if ( item.qty === 0 ) {
            this.removeItem( item )
        }
    },
    addItem( item ){
        const cartItem = this.findCartItem( item );
        if ( !cartItem ) {
            this.cartItems.push( Object.assign( {qty: 1}, item ) );
        }
        else {
            this.increaseItem( cartItem );
        }
    },
    writeTweet(status, in_reply_to_status_id){
      return new Promise((resolve, reject)=>{
        axios.post(createURL('/statuses/update',{status, in_reply_to_status_id}))
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    getTweets(since_id, max_id, count = 200){

      return new Promise((resolve, reject)=>{
        axios.get(createURL('/statuses/home_timeline',{since_id,max_id,count}))
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    likeTweet(id){
      return new Promise((resolve, reject)=>{
        axios.post(createURL('/favorites/create', {id}))
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    unlikeTweet(id){
      return new Promise((resolve, reject)=>{
        axios.post(createURL('/favorites/destroy',{id}))
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    retweetTweet(id){
      return new Promise((resolve, reject)=>{
        axios.post(createURL('/statuses/retweet',{id}))
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    unretweetTweet(id){
      return new Promise((resolve, reject)=>{
        axios.post(createURL('/statuses/unretweet',{id}))
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    getCatalog(){
        return this.catalog.map(item => {
        return Object.assign( {}, item, this.cartItems.find( cItem => cItem.id === item.id))
        })
    },
    init(){
        for ( let i = 1; i < 9; i++ ) {
            this.catalog.push( {
                'id': 'Widget' + i,
                'title': 'Widget #' + i,
                'summary': 'A great widget',
                'description': 'Lorem ipsum dolor sit amet.',
                'cost': i
            } );
        }
    }
}

CartAPI.init();
export default CartAPI;

function createURL(path, params){
  var tURL = url.parse(`${twitterBase}${path}`);
  tURL.search = qs.stringify(params);
  return tURL.format();
}
