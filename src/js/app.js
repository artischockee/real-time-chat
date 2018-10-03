import React from 'react';
import autobind from 'autobind-decorator';
import { hot } from 'react-hot-loader';
import EntryContainer from './entry/containers/entry';
import ChatContainer from './chat/containers/chat';
import MsgDeleteDialogContainer from './dialogs/containers/msg-delete-dialog';
import { WS_STATES, CALLBACK_STATE } from './auxiliary/states';
import throttle from './auxiliary/throttle';

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

    this.throttleHandler = throttle(1000, this.windowEventsHandler);

    this.state = {
      chatMessages: [],
      connection: null,
      clientID: 0,
      currentFragment: FRAGMENTS.ENTRY,
      displayMsgDeleteDialog: false,
      isMobileVersion: false,
      message: '',
      usersOnline: [],
      userData: {
        login: '',
        sign: ''
      }
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

  handleMsgBoxKeyUp(event) {
    if (event.key === 'Enter')
      this.sendMessage();
  }

  handleMsgBoxChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleMsgDelete() {
    let chatMessages = this.state.chatMessages;

    chatMessages.length = 0;

    this.setState({
      chatMessages
    });

    this.toggleMsgDeleteDialog();
  }

  getMsgDeleteDialog() {
    if (this.state.displayMsgDeleteDialog)
      return (
        <MsgDeleteDialogContainer
          handleDialogClose={this.toggleMsgDeleteDialog}
          handleDeleteAccept={this.handleMsgDelete}
        />
      );
    else
      return null;
  }

  toggleMsgDeleteDialog() {
    let displayMsgDeleteDialog = !this.state.displayMsgDeleteDialog;

    this.setState({
      displayMsgDeleteDialog
    });
  }

  windowEventsHandler() {
    let isMobileVersion = document.body.clientWidth <= 860;

    this.setState({ isMobileVersion });
  }

  componentDidMount() {
    // Run windowEventsHandler() to specify the clientWidth
    this.windowEventsHandler();

    window.addEventListener('resize', this.throttleHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleHandler);
  }

  render() {
    switch (this.state.currentFragment) {
      case FRAGMENTS.ENTRY:
        return (
          <EntryContainer
            handleConnect={this.connect}
            handleLogInInputChange={this.handleLogInInputChange}
            userData={this.state.userData}
          />
        );
      case FRAGMENTS.CHAT:
        return (
          <React.Fragment>

            {this.getMsgDeleteDialog()}

            <ChatContainer
              clientID={this.state.clientID}
              handleMsgBoxChange={this.handleMsgBoxChange}
              handleMsgBoxKeyUp={this.handleMsgBoxKeyUp}
              handleMsgDelete={this.toggleMsgDeleteDialog}
              isMobileVersion={this.state.isMobileVersion}
              messages={this.state.chatMessages}
              messageValue={this.state.message}
              userList={this.state.usersOnline}

              handleControlClick={this.handleControlClick}
            />

          </React.Fragment>
        );
    }
  }
}

export default hot(module)(App);
