import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';
import LoginBoxContainer from './login-box';
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
  en: 'Write your message..',
  ru: 'Напишите сообщение..'
};

const SEND = {
  en: 'Send',
  ru: 'Отправить'
};

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.chatWindowRef = React.createRef();

    this.state = {
      chatAttachedToEnd: true,
      displayLoginBox: true,
      lastMessageClientID: 0
    };
  }

  getLoginBoxContainer() {
    if (this.state.displayLoginBox)
      return (
        <LoginBoxContainer
          handleConnect={this.handleConnect}
          handleInputChange={this.props.handleLoginBoxChange}
          lang={this.props.lang}
          userData={this.props.loginBoxUserData}
        />
      );
    else
      return null;
  }

  getUserMessages() {
    // For the 1st rendering process
    // there is no need in exec this function
    // (p.s. props.messages is an Array).
    if (this.props.messages === undefined
    || this.props.messages.length == 0)
      return null;

    let msgArray = this.props.messages;

    let combinedUserMessages = [];
    let combinedIndex = 0;

    msgArray.forEach((item, index, msgArray) => {
      if (index == 0 || item.id !== msgArray[index - 1].id) {
        combinedUserMessages.push({
          date: item.date,
          id: item.id,
          image: item.image,
          login: item.login,
          sign: item.sign,
          text: item.text instanceof Array ? [...item.text] : [item.text]
        });

        combinedIndex = combinedUserMessages.length - 1;
      }

      else {
        let sameUserDataMsg = combinedUserMessages[combinedIndex].text;
        combinedUserMessages[combinedIndex].text = [...sameUserDataMsg, item.text];
      }
    });

    return combinedUserMessages.map((item, index) => {
      let time = assemblyMessageDate(item.date);
      return (
        <UserMessagesContainer
          image={item.image}
          key={index}
          login={item.login}
          messages={item.text}
          sign={item.sign}
          time={time}
        />
      )
    });
  }

  handleConnect() {
    this.setState({
      displayLoginBox: false
    });
    this.props.handleConnect();
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
        controlsAreFrozen={this.props.controlsAreFrozen}
        handleMessageBoxChange={this.props.handleMessageBoxChange}
        handleMessageBoxEnterKeyPress={this.props.handleMessageBoxEnterKeyPress}
        handleMessageSending={this.props.handleMessageSending}
        handleScroll={this.handleScroll}
        loginBoxContainer={this.getLoginBoxContainer()}
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
