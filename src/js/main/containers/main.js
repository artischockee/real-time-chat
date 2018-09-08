import React from 'react';
import autobind from 'autobind-decorator';
import Main from '../components/main';

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

    const ITER_COUNT = 20;
    const DELAY = 100;
    const MAX_RECREATING_TIMES = 5;

    let connection = new WebSocket(SERVER_URL);

    let iterCount = ITER_COUNT;
    let maxRecreatingTimes = MAX_RECREATING_TIMES;

    let interval = setInterval(() => {
      if (connection.readyState === 1) {
        clearInterval(interval);
        return;
      }
      if (--iterCount === 0) {
        iterCount = ITER_COUNT;
        maxRecreatingTimes--;

        connection = new WebSocket(SERVER_URL);
        console.log(`A new WebSocket connection created after ${ITER_COUNT * DELAY}ms of waiting for the previous one.`);
      }
      if (maxRecreatingTimes === 0) {
        clearInterval(interval);
        throw new Error('Could not establish the WebSocket connection.');
      }
    }, DELAY);

    connection.onopen = event => {
      this.setState({
        controlsAreFrozen: false,
        displayLoginBox: false,
        onlineSectionHidden: false
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
        // connectionReadyState={}
        displayLoginBox={this.state.displayLoginBox}
        lang={this.props.lang}
        loginBoxUserData={this.state.userData}
        onlineSectionHidden={this.state.onlineSectionHidden}
        onlineSectionUsersOnline={this.state.usersOnline}
      />
    );
  }
}
