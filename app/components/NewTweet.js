import React, { Component, PropTypes } from 'react';
import {newTweet} from '../services/helpers';
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
export default class NewTweet extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.getNewTweetValue = this.getNewTweetValue.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }

  handleTweet(evt){
    evt.stopPropagation();
    let tweet = this.getNewTweetValue();
    console.log(tweet);

    newTweet(tweet)
      .then((tweet)=>{
        console.log(tweet);
      })
      .catch((err)=>{
        console.log(err);
      });

  }

  getNewTweetValue() {
    return this.refs.newTweet.value
  }

  handleKeyUp() {
    let tweet = this.getNewTweetValue();
    console.log(tweet);
    console.log(tweet.length);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    setTimeout(()=>document.querySelector('.new-tweet-text').focus());
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="new-tweet">
        <TiEdit className="new-tweet-icon" onClick={this.openModal} data-tip="Write a new tweet"/>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div className="new-tweet-modal">
            <label htmlFor="newTweet">Tweet</label>
            <textarea name="newTweet"
                      className="new-tweet-text"
                      id="newTweet"
                      ref="newTweet"
                      onKeyUp={this.handleKeyUp}></textarea>
          </div>
          <footer className="new-tweet-modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.handleTweet.bind(this)}>Tweet</button>
            <button type="button" className="btn" onClick={this.closeModal}>Cancel</button>
          </footer>
        </Modal>
      </div>
    )
  }
}
