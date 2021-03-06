import React, { Component, PropTypes } from 'react';
import {retweetTweet, unretweetTweet} from '../../api/helpers';
import ReactTooltip from 'react-tooltip';
import {TiEdit} from 'react-icons/lib/ti';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    maxWidth: '500',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class WriteTweet extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.getWriteTweetValue = this.getWriteTweetValue.bind(this);
  }

  handleRetweet(evt){
    evt.stopPropagation();
    ReactTooltip.hide()
    this.props.tweet.retweeted = true;
    this.props.tweet.retweet_count++;
    this.setState({tweet: this.props.tweet});

    let id = this.props.tweet.id_str;
    retweetTweet(id)
      .then((tweet)=>{
        this.props.tweet.retweet_count = tweet.data.retweet_count;
        this.setState({tweet: this.props.tweet});
      })
      .catch((err)=>{
        this.props.tweet.retweeted = false;
        this.setState({tweet: this.props.tweet});
      });

  }

  getWriteTweetValue() {
    return this.refs.WriteTweet.value
  }

  handleKeyUp() {
    console.log(this.getWriteTweetValue());
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="write-tweet">
        <TiEdit className="write-tweet-icon" onClick={this.openModal} data-tip="Write a new tweet"/>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div className="write-tweet-modal">
            <textarea name="WriteTweet"
                      id="WriteTweet"
                      ref="WriteTweet"
                      onKeyUp={this.handleKeyUp}></textarea>
          </div>
          <button className="btn" onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    )
  }
}
