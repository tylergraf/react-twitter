import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class TweetText extends Component {
  constructor(props){
    super(props);
    // debugger;
    console.log(props);
  }

  replaceUrls(text, urls){
    if(!urls.length)
      return text;

    urls.forEach((url) =>{
      text = text.replace(url.url, `<a target="_blank" href="${url.expanded_url}">${url.display_url}</a>`);
    })
    return text;
  }
  replaceUserMentions(text, userMentions){
    if(!userMentions.length)
      return text;

    userMentions.forEach((mention, index) =>{
      let ind = text.indexOf(mention.screen_name);
      text = text.slice(0,ind-1) + text.slice(ind);
      text = text.replace(mention.screen_name, `<a href="/user/${mention.screen_name}">@${mention.screen_name}</a>`);
    })
    return text;
  }
  replaceHashTags(text, hashtags){
    if(!hashtags.length)
      return text;

    hashtags.forEach((hashtag, index) =>{
      let ind = text.indexOf(hashtag.text);
      text = text.slice(0,ind-1) + text.slice(ind);
      text = text.replace(hashtag.text, `<a target="_blank" href="${hashtag.text}">#${hashtag.text}</a>`);
    })

    return text;
  }

  parseText(text, entities){
    text = this.replaceUserMentions(text, entities.user_mentions);
    text = this.replaceHashTags(text, entities.hashtags);
    text = this.replaceUrls(text, entities.urls);
    return text;
  }

  render() {
    const { text, user, entities } = this.props.tweet

    return (
      <p className="tweet-text" dangerouslySetInnerHTML={{__html: this.parseText(text, entities)}}></p>
    )
  }
}

// TweetText.propTypes = {
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatarUrl: PropTypes.string.isRequired,
//     name: PropTypes.string
//   }).isRequired
// }
