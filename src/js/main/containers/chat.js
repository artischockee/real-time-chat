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

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayLoginBox: true,
      lastMessageClientID: 0
      // displayLoginBox: false // ONLY FOR DEV!
    };
  }

  getLoginBoxContainer() {
    if (this.state.displayLoginBox)
      return (
        <LoginBoxContainer
          handleConnect={this.handleConnect}
          handleInputChange={this.props.handleLoginBoxChange}
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages === undefined
    || nextProps.messages.length == 0)
      return;

    console.log(':: at WILLRECEIVEPROPS ::');

    let lastMessageClientID = nextProps.messages[nextProps.messages.length - 1].id;

    console.log('WILLRECEIVEPROPS: clientID: ' + nextProps.clientID);
    console.log('WILLRECEIVEPROPS: lastMessageClientID: ' + lastMessageClientID);

    if (nextProps.clientID !== lastMessageClientID) {
      console.warn('WILLRECEIVEPROPS: clientID !== lastMessageClientID');
      this.setState({
        lastMessageClientID
      });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // may be BUG'gy
  //   if (nextState.lastMessageClientID !== this.state.lastMessageClientID)
  //     return false;
  //
  //   return true;
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('Chat updated.');

    console.log(':: at DIDUPDATE ::');

    console.log('DIDUPDATE: clientID: ' + prevProps.clientID);
    console.log('DIDUPDATE: lastMessageClientID: ' + prevState.lastMessageClientID);

    // so bad, but it works:

    if (prevProps.clientID !== prevState.lastMessageClientID)
      return;

    let chatWindow = document.querySelector('.chat .section-main');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  render() {
    return (
      <Chat
        controlsAreFrozen={this.props.controlsAreFrozen}
        handleMessageBoxChange={this.props.handleMessageBoxChange}
        handleMessageSending={this.props.handleMessageSending}
        loginBoxContainer={this.getLoginBoxContainer()}
        messages={this.getUserMessages()}
        messageValue={this.props.messageValue}
      />
    );
  }
}
