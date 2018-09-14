import React from 'react';
import autobind from 'autobind-decorator';
import Main from '../components/main';
import { WS_STATES, CALLBACK_STATE } from '../../auxiliary/states';

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
      onlineSectionHidden: true,
      displayLoginBox: true
    };
  }

  getConnectionState() {
    if (this.state.connection === null
    || this.state.connection === undefined)
      return null;

    return this.state.connection.readyState;
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

    connection.onopen = event => {
      this.setState({
        controlsAreFrozen: false
      });
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

    this.setState({ connection });

    this.props.confirmLogIn();
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

  getLoginBoxCallback(state) {
    switch (state) {
      case CALLBACK_STATE.SUCCESS:
        this.setState({
          displayLoginBox: false,
          onlineSectionHidden: false
        });
        break;
      case CALLBACK_STATE.FAILURE:
        this.state.connection.close();
        throw new Error('Could not open the WebSocket connection.');
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.clientID !== this.state.clientID
    || nextState.connection !== this.state.connection)
      return false;

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.onlineSectionHidden !== this.state.onlineSectionHidden) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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
        connectionState={this.getConnectionState()}
        displayLoginBox={this.state.displayLoginBox}
        lang={this.props.lang}
        loginBoxCallback={this.getLoginBoxCallback}
        loginBoxUserData={this.state.userData}
        onlineSectionHidden={this.state.onlineSectionHidden}
        onlineSectionUsersOnline={this.state.usersOnline}
      />
    );
  }
}
