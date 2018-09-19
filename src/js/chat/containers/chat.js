import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';

const NOTIFICATION_SOUND = new Audio('appointed.mp3');

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationSoundShouldPlay: true
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
        handleMsgBoxChange={this.props.handleMsgBoxChange}
        handleMsgBoxKeyUp={this.props.handleMsgBoxKeyUp}
        handleMsgDelete={this.props.handleMsgDelete}
        lang={this.props.lang}
        messages={this.props.messages}
        messageValue={this.props.messageValue}
        shouldNotificationSoundPlay={this.shouldNotificationSoundPlay}
        userList={this.props.userList}
      />
    );
  }
}
