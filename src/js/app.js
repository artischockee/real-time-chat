import React from 'react';
import autobind from 'autobind-decorator';
import { hot } from 'react-hot-loader';
import EntryContainer from './entry/containers/entry';
import ChatContainer from './chat/containers/chat';
import { LANGUAGE } from './auxiliary/language';
import { WS_STATES, CALLBACK_STATE } from './auxiliary/states';

const HOSTNAME = window.location.hostname;
const PORT = window.location.port;
const COLON = PORT === '' ? '' : ':';
const PROTOCOL = window.location.protocol;
const WS_PROTOCOL = PROTOCOL === 'http:' ? 'ws:' : 'wss:';
const SERVER_URL = `${WS_PROTOCOL}//${HOSTNAME}${COLON}${PORT}`;

const MSG_TYPES = {
  MESSAGE: 'MESSAGE',
  ID: 'ID',
  USERDATA: 'USERDATA',
  USERLIST: 'USERLIST',
  REJECT_USERDATA: 'REJECT_USERDATA'
};

const FRAGMENTS = {
  ENTRY: 'ENTRY',
  CHAT: 'CHAT'
};

@autobind
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatMessages: [],
      connection: null,
      clientID: 0,
      currentFragment: FRAGMENTS.ENTRY,
      language: LANGUAGE.EN.SHORT,
      message: '',
      usersOnline: [],
      userData: {
        login: '',
        sign: ''
      }
    };
  }

  handleLangChange(language) {
    switch (language) {
      case undefined:
      case null:
        return;
    }

    this.setState({ language });
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

    connection.onopen = event => {
      console.log('WS connection opened.');
    };

    connection.onmessage = event => {
      let message = JSON.parse(event.data);

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
          alert(`Your login has been changed to ${message.login} because previous name is already taken.`);
          break;
      }
    };

    connection.onclose = event => {
      console.log('WebSocket connection has been closed.');
    }

    connection.onerror = event => {
      console.error('WebSocket error observed:', event);
    }

    this.setState({
      connection,
      currentFragment: FRAGMENTS.CHAT
    });
  }

  sendMessage() {
    if (this.state.message === '')
      return;

    let message = {
      type: MSG_TYPES.MESSAGE,
      text: this.state.message,
      id: this.state.clientID,
      date: Date.now()
    };

    this.state.connection.send(JSON.stringify(message));

    this.setState({ message: '' });
  }

  handleLogInInputChange(event) {
    let keyName = event.target.name;

    let userData = this.state.userData;

    userData[keyName] = event.target.value;

    this.setState({ userData });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App updated.');
  }

  render() {
    switch (this.state.currentFragment) {
      case FRAGMENTS.ENTRY:
        return (
          <EntryContainer
            handleConnect={this.connect}
            handleLangChange={this.handleLangChange}
            handleLogInInputChange={this.handleLogInInputChange}
            lang={this.state.language}
            userData={this.state.userData}
          />
        );
      case FRAGMENTS.CHAT:
        return (
          <ChatContainer />
        );
      default:
        throw new Error('Could not find an appropriate fragment.');
    }
  }
}

export default hot(module)(App);
