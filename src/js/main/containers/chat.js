import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';
import UserMessagesContainer from './user-messages';

function alignTimeValue(timeValue) {
  if (timeValue.length === 1)
    return `0${timeValue}`;
  else return timeValue;
}

function assemblyMessageDate(rawDate) {
  let date = new Date(rawDate);

  let hours = alignTimeValue(date.getHours().toString());
  let minutes = alignTimeValue(date.getMinutes().toString());

  return `${hours}:${minutes}`;
}

const TITLE = {
  en: 'Chat',
  ru: 'Чат'
};

const PLACEHOLDER = {
  en: 'Type a message..',
  ru: 'Сообщение..'
};

const SEND = {
  en: 'Send',
  ru: 'Отправить'
};

const CHAT_ICON_ALT = {
  en: 'Chat icon',
  ru: 'Иконка чата'
};

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.chatWindowRef = React.createRef();

    this.state = {
      chatAttachedToEnd: true,
      lastMessageClientID: 0
    };
  }

    return null;
  }

  handleScroll() {
    let chatWindow = this.chatWindowRef.current;

    let chatAttachedToEnd =
      chatWindow.scrollTop + chatWindow.clientHeight === chatWindow.scrollHeight;

    // Escape render() spamming while scrolling the chat:
    if (this.state.chatAttachedToEnd === chatAttachedToEnd)
      return;

    this.setState({ chatAttachedToEnd });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.chatAttachedToEnd !== this.state.chatAttachedToEnd)
      return false;

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.messages.length === this.props.messages.length)
      return;

    let chatWindow = this.chatWindowRef.current;

    if (
      this.props.clientID === this.props.messages[this.props.messages.length - 1].id
      || this.state.chatAttachedToEnd
    ) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }

  render() {
    return (
      <Chat
        emptyChatPlaceholder={this.getEmptyChatPlaceholder()}
        controlsAreFrozen={this.props.controlsAreFrozen}
        handleMessageBoxChange={this.props.handleMessageBoxChange}
        handleMessageBoxEnterKeyPress={this.props.handleMessageBoxEnterKeyPress}
        handleMessageSending={this.props.handleMessageSending}
        handleScroll={this.handleScroll}
        messages={this.getUserMessages()}
        messageValue={this.props.messageValue}
        placeholder={PLACEHOLDER[this.props.lang]}
        send={SEND[this.props.lang]}
        title={TITLE[this.props.lang]}
        windowRef={this.chatWindowRef}
      />
    );
  }
}
