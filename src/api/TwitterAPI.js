import axios from 'axios'

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
    getTweets(sinceId){
      return new Promise((resolve, reject)=>{
        axios.get(`/api/homeTimeline?sinceId=${sinceId}`)
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    likeTweet(id){
      return new Promise((resolve, reject)=>{
        axios.post(`/api/favorite/${id}`)
        .then(data => resolve(data.data))
        .catch(err => reject(err))
      });
    },
    unlikeTweet(id){
      return new Promise((resolve, reject)=>{
        axios.delete(`/api/favorite/${id}`)
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
