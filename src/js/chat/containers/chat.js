import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';
import { BTN_NAMES } from '../../auxiliary/chat-button-names';

const NOTIFICATION_SOUND = new Audio('appointed.mp3');

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationSoundShouldPlay: true
    }
  }

  handleControlClick(event) {
    switch (event.target.name) {
      case BTN_NAMES.NOTIFICATIONS:

        break;
      case BTN_NAMES.DEL_MESSAGES:

        break;
      default:

    }
  }

  shouldNotificationSoundPlay(state) {
    this.setState({
      notificationSoundShouldPlay: state
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Chat updated.');
    
    if (
      prevProps.messages !== this.props.messages
      && this.props.messages[this.props.messages.length - 1].id !== this.props.clientID
      && this.state.notificationSoundShouldPlay
    )
      NOTIFICATION_SOUND.play();
  }

  render() {
    return (
      <Chat
        handleControlClick={this.handleControlClick}
        handleMsgBoxChange={this.props.handleMsgBoxChange}
        handleMsgBoxKeyUp={this.props.handleMsgBoxKeyUp}
        lang={this.props.lang}
        messages={this.props.messages}
        messageValue={this.props.messageValue}
        shouldNotificationSoundPlay={this.shouldNotificationSoundPlay}
        userList={this.props.userList}
      />
    );
  }
}
