import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';
import { BTN_NAMES } from '../../auxiliary/chat-button-names';

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Chat updated.');
  }

  render() {
    return (
      <Chat
        handleControlClick={this.handleControlClick}
        lang={this.props.lang}
        messages={this.props.messages}
        userList={this.props.userList}
      />
    );
  }
}
