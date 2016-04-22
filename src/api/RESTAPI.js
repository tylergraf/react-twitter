import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export function getTimeline(username){
  let call;
  if(username){
    call = axios.get(`/api/userTimeline/${username}`)
  } else {
    call = axios.get(`/api/userTimeline`);
  }
  return call.then((data) => ({tweets: data.data}))
}

export function newTweet(tweet){
  return axios.post('/api/tweet', {tweet});
}

export function retweetTweet(id){
  return axios.post(`/api/retweet/${id}`);
}
export function unretweetTweet(id){
  return axios.delete(`/api/retweet/${id}`);
}

export function favoriteTweet(id){
  return axios.post(`/api/favorite/${id}`);
}
export function unFavoriteTweet(id){
  return axios.delete(`/api/favorite/${id}`);
}

export function getHomeTimeline(){
  return axios.get(`/api/homeTimeline`)
    .then((data) => ({tweets: data.data}))
}

function getRepos(username){
  return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getUserInfo(username){
  return axios.get(`https://api.github.com/users/${username}`);
}

export function getGithubInfo(username){
  return axios.all([getRepos(username), getUserInfo(username)])
    .then((arr) => ({repos: arr[0].data,bio: arr[1].data}))
}
