import React from 'react';
import autobind from 'autobind-decorator';
import ChatInput from '../components/chat-input';

@autobind
export default class ChatInputContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('ChatInput updated.');
  }

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
