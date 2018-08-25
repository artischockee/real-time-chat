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
        sign: ''
      },
      usersOnline: [],
      chatMessages: [],
      controlsAreFrozen: true,
      // controlsAreFrozen: false, // ONLY FOR DEV
      onlineSectionHidden: true
    };
  }

  applyLoginBoxData() {
    let message = {
      type: MSG_TYPES.USERDATA,
      date: Date.now(),
      id: this.state.clientID,
      login: this.state.userData.login,
      sign: this.state.userData.sign
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
      console.log('WS: Connection OPEN event.');

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

      console.log('WS: MESSAGE data:');
      console.log(message);

      switch (message.type) {
        case MSG_TYPES.ID:
          this.setState({ clientID: message.id });
          this.applyLoginBoxData();
          break;
        case MSG_TYPES.USERLIST:
          this.setState({
            usersOnline: message.users
          })
          break;
        case MSG_TYPES.MESSAGE:
          let chatMessages = [...this.state.chatMessages, message];
          this.setState({ chatMessages });
          break;
        case MSG_TYPES.REJECT_USERDATA:

          break;
      }
    };

    this.setState({
      connection
    });
  }

  sendMessage() {
    if (this.state.message === '') {
      console.warn('Nothing to send.');
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

  chatHandleLoginBoxChange(event) {
    let keyName = event.target.name;

    let key = this.state.userData;

    key[keyName] = event.target.value;

    this.setState({
      userData: key
    });
  }

  componentDidUpdate(prevProps, prevState) {
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
        chatMessages={this.state.chatMessages}
        chatMessageValue={this.state.message}
        loginBoxUserData={this.state.userData}
        onlineSectionHidden={this.state.onlineSectionHidden}
        onlineSectionUsersOnline={this.state.usersOnline}
      />
    );
  }
}
