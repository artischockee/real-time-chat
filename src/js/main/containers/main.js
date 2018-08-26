import React from 'react';
import autobind from 'autobind-decorator';
import Main from '../components/main';

const HOSTNAME = window.location.hostname;
const PORT = 8080;
const SERVER_URL = `ws://${HOSTNAME}:${PORT}`;

const MSG_TYPES = {
  MESSAGE: 'MESSAGE',
  ID: 'ID',
  USERDATA: 'USERDATA',
  USERLIST: 'USERLIST',
  REJECT_USERDATA: 'REJECT_USERDATA'
};

function getRandomUserImageSrc() {
  let imageNumber = Math.floor(Math.random() * 20) + 1;

  return `images/avatars/${imageNumber}.jpg`;
}

@autobind
export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connection: null,
      clientID: 0,
      message: '',
      userData: {
        login: '',
        sign: '',
        image: ''
      },
      usersOnline: [],
      chatMessages: [],
      controlsAreFrozen: true,
      // controlsAreFrozen: false, // ONLY FOR DEV
      onlineSectionHidden: true
    };
  }

  applyLoginBoxData() {
    let userData = this.state.userData;
    if (userData.image === '')
      userData.image = getRandomUserImageSrc();

    this.setState({ userData });

    let message = {
      type: MSG_TYPES.USERDATA,
      date: Date.now(),
      id: this.state.clientID,
      login: this.state.userData.login,
      sign: this.state.userData.sign,
      image: this.state.userData.image
    };

    this.state.connection.send(JSON.stringify(message));
  }

  connect() {
    if (this.state.connection !== null) {
      console.error('You have already established the connection.');
      return;
    }

    let connection = new WebSocket(SERVER_URL);

    connection.onopen = (event) => {
      this.setState({
        controlsAreFrozen: false,
        onlineSectionHidden: false
      });
    };

    // this.setState({
    //   controlsAreFrozen: false,
    //   onlineSectionHidden: false
    // });

    connection.onmessage = (event) => {
      let message = JSON.parse(event.data);

      // DEV (for reducing redundant output in other userwindow):
      if (message.id === this.state.clientID)
        console.log(message);

      switch (message.type) {
        case MSG_TYPES.ID:
          this.setState({ clientID: message.id });
          this.applyLoginBoxData();
          break;
        case MSG_TYPES.USERLIST:
          this.setState({
            usersOnline: message.users
          });
          break;
        case MSG_TYPES.MESSAGE:
          let chatMessages = [...this.state.chatMessages, message];
          this.setState({ chatMessages });
          break;
        case MSG_TYPES.REJECT_USERDATA:

          break;
      }
    };

    this.setState({ connection });
  }

  sendMessage() {
    if (this.state.message === '') {
      console.warn('Nothing to send.'); // TODO: replace it with UI notification
      return;
    }

    let message = {
      type: MSG_TYPES.MESSAGE,
      text: this.state.message,
      id: this.state.clientID,
      date: Date.now()
    };

    this.state.connection.send(JSON.stringify(message));

    this.setState({ message: '' });
  }

  chatHandleMessageBoxChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  chatHandleMessageBoxEnterKeyPress(event) {
    if (!this.state.controlsAreFrozen && event.key === 'Enter')
      this.sendMessage();
  }

  chatHandleLoginBoxChange(event) {
    let keyName = event.target.name;

    let userData = this.state.userData;

    userData[keyName] = event.target.value;

    this.setState({ userData });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Main updated.');
  }

  render() {
    return (
      <Main
        chatClientID={this.state.clientID}
        chatControlsAreFrozen={this.state.controlsAreFrozen}
        chatHandleConnect={this.connect}
        chatHandleLoginBoxChange={this.chatHandleLoginBoxChange}
        chatHandleMessageSending={this.sendMessage}
        chatHandleMessageBoxChange={this.chatHandleMessageBoxChange}
        chatHandleMessageBoxEnterKeyPress={this.chatHandleMessageBoxEnterKeyPress}
        chatMessages={this.state.chatMessages}
        chatMessageValue={this.state.message}
        loginBoxUserData={this.state.userData}
        onlineSectionHidden={this.state.onlineSectionHidden}
        onlineSectionUsersOnline={this.state.usersOnline}
      />
    );
  }
}
