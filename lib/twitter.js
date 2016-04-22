var Twitter = require('twitter'),
    Twit = require('twit-promise'),
    twitter = require('twitter-node-client').Twitter;
    Express = require('express');
var jsonfile = require('jsonfile');

const router = Express.Router();


function createTwitterClient(req, res, next){
  if(!req.user){
    return next({code: 401});
  }
  req.twit = new Twit({
    consumer_key: 'ArIgk34kBQEwjBWbW6PFBceFO',
    consumer_secret: 'nLSPmdtMCh9aTZQzVVcNl08dEJecGiImNu9G1SjrmvmxfHiRtz',
    access_token: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  // req.twit = new twitter(config);
  config = {
      "consumerKey": "ArIgk34kBQEwjBWbW6PFBceFO",
      "consumerSecret": "nLSPmdtMCh9aTZQzVVcNl08dEJecGiImNu9G1SjrmvmxfHiRtz",
      "accessToken": req.user.token,
      "accessTokenSecret": req.user.tokenSecret,
      "callBackUrl": 'http://127.0.0.1:3000/auth/twitter/callback'
  }

  req.twitter = new twitter(config);

  next();
}

router.get('/userTimeline', createTwitterClient, userTimeline);
router.get('/userTimeline/:username', createTwitterClient, userTimeline);
router.get('/homeTimeline', createTwitterClient, homeTimeline);
router.post('/favorite/:id', createTwitterClient, favoriteTweet);
router.delete('/favorite/:id', createTwitterClient, unFavoriteTweet);
router.post('/retweet/:id', createTwitterClient, retweetTweet);
router.delete('/retweet/:id', createTwitterClient, unretweetTweet);
router.post('/tweet', createTwitterClient, newTweet);


function newTweet(req,res,next){
  var status = req.body.tweet;
console.log(status);
  req.twit.post('statuses/update', {status: status})
    .then(function(tweet){
      console.log(tweet);
      res.json(tweet.data);
    }, function(err){
      console.log(err);
      next(err);
    });

}

function favoriteTweet(req,res,next){
  var id = req.params.id;

  req.twit.post('favorites/create', {id: id})
    .then(function(tweets){
      console.log(tweets);
      res.json(tweets.data);
    }, function(err){
      console.log(err);
      next(err);
    });

}
function unFavoriteTweet(req,res,next){
  var id = req.params.id;

  req.twit.post('favorites/destroy', {id: id})
    .then(function(tweets){
      console.log(tweets);
      res.json(tweets.data);
    }, function(err){
      console.log(err);
      next(err);
    });

}

function retweetTweet(req,res,next){
  var id = req.params.id;

  req.twit.post('statuses/retweet', {id: id})
    .then(function(tweets){
      console.log(tweets);
      res.json(tweets.data);
    }, function(err){
      console.log(err);
      next(err);
    });

}
function unretweetTweet(req,res,next){
  var id = req.params.id;

  req.twit.post('statuses/unretweet', {id: id})
    .then(function(tweets){
      console.log(tweets);
      res.json(tweets.data);
    }, function(err){
      console.log(err);
      next(err);
    });

}

function userTimeline(req,res,next){
  var username = req.params.username || req.user.profile.username;

  req.twitterClient.get('statuses/user_timeline', {screen_name: username}, function(err, tweets, response){
    if (err) {
      return next(err);
    }

    res.json(tweets);
  });
}

function homeTimeline(req,res,next){
  var options = {},
      sinceId = req.query.sinceId,
      maxId = req.query.maxId;

  if(sinceId && sinceId !== 'null'){
    options.since_id = sinceId;
  }

  if(maxId && maxId !== 'null'){
    options.max_id = maxId;
  }
  // return res.json(jsonfile.readFileSync('tweets.json'));
console.log(options)
  req.twit.get('statuses/home_timeline', options)
    .then(function(tweets){
      res.json(tweets.data);
    }, function(err){
      next(err);
    });
}

module.exports = router;
