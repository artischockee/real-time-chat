import React from 'react';
import autobind from 'autobind-decorator';
import ChatInput from '../components/chat-input';

@autobind
export default class ChatInputContainer extends React.Component {
  render() {
    return (
      <ChatInput
        handleMsgBoxChange={this.props.handleMsgBoxChange}
        handleMsgBoxKeyUp={this.props.handleMsgBoxKeyUp}
        messageValue={this.props.messageValue}
        placeholder="type a message"
      />
    );
  }
}
