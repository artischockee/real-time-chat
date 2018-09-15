import React from 'react';
import autobind from 'autobind-decorator';
import Main from '../components/main';

@autobind
export default class MainContainer extends React.Component {
  chatHandleMessageBoxChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  chatHandleMessageBoxEnterKeyPress(event) {
    if (!this.state.controlsAreFrozen && event.key === 'Enter')
      this.sendMessage();
  }

  getLoginBoxCallback(state) {
    console.log('getLoginBoxCallback() : ' + state);

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
        chatHandleMessageSending={this.sendMessage}
        chatHandleMessageBoxChange={this.chatHandleMessageBoxChange}
        chatHandleMessageBoxEnterKeyPress={this.chatHandleMessageBoxEnterKeyPress}
        chatMessages={this.state.chatMessages}
        chatMessageValue={this.state.message}
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
