import React, { Component, PropTypes } from 'react';
import AppActions from '../../actions/app-actions';
import ReactTooltip from 'react-tooltip';
import {TiEdit, TiArrowBack} from 'react-icons/lib/ti';
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

    this.closeModal = this.closeModal.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.getWriteTweetValue = this.getWriteTweetValue.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }

  handleTweet(evt){
    evt.stopPropagation();
    let tweet = this.getWriteTweetValue();

    AppActions.writeTweet(tweet, this.props.replyTweet.id_str);
    this.closeModal()
  }

  getWriteTweetValue() {
    return this.refs.writeTweet.value
  }

  handleKeyUp() {
    let tweet = this.getWriteTweetValue();
    console.log(tweet);
    console.log(tweet.length);
  }

  openModal(evt) {
    evt.stopPropagation();
    this.setState({modalIsOpen: true});
    setTimeout(()=>document.querySelector('.write-tweet-text').focus());
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const icon = (this.props.replyTweet) ? <TiArrowBack className="reply-icon" onClick={this.openModal.bind(this)} data-tip="Reply to this tweet"/> : <TiEdit className="write-tweet-icon" onClick={this.openModal.bind(this)} data-tip="Write a new tweet"/>;
    return (
      <div className="write-tweet">
        {icon}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div className="write-tweet-modal">
            <label htmlFor="writeTweet">Tweet</label>
            <textarea name="writeTweet"
                      className="write-tweet-text"
                      id="writeTweet"
                      ref="writeTweet"
                      onKeyUp={this.handleKeyUp}></textarea>
          </div>
          <footer className="write-tweet-modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.handleTweet.bind(this)}>Tweet</button>
            <button type="button" className="btn" onClick={this.closeModal}>Cancel</button>
          </footer>
        </Modal>
      </div>
    )
  }
}
