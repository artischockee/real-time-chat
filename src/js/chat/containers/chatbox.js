import React from 'react';
import autobind from 'autobind-decorator';
import ChatBox from '../components/chatbox';
import EmptyChatPlaceholderContainer from './empty-chat-placeholder';

@autobind
export default class ChatBoxContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getEmptyChatPlaceholder() {
    if (this.props.messages.length !== 0)
      return null;

    return (
      <EmptyChatPlaceholderContainer
        lang={this.props.lang}
      />
    );
  }

  render() {
    return (
      <ChatBox
        emptyChatPlaceholder={this.getEmptyChatPlaceholder()}
      />
    );
  }
}
