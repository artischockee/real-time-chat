import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';

const NOTIFICATION_SOUND = new Audio('appointed.mp3');

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationSoundShouldPlay: true,
      searchValue: '',
      displaySidePanelOnMobile: false
    }
  }

  displaySidePanel() {
    let displaySidePanelOnMobile = !this.state.displaySidePanelOnMobile;

    this.setState({
      displaySidePanelOnMobile
    });
  }

  getFadeComponent() {
    if (!this.props.isMobileVersion)
      return null;

    let classList = 'chat__fade-component';

    if (this.state.displaySidePanelOnMobile)
      classList += ` ${classList}_visible`;
    else
      classList += ` ${classList}_hidden`;

    return <div className={classList} onClick={this.displaySidePanel}></div>;
  }

  getFilteredUserList() {
    if (this.state.searchValue === '')
      return this.props.userList;

    return this.props.userList.filter(user => {
      let login = user.login.toLowerCase();
      let sign = user.sign.toLowerCase();
      let searchValue = this.state.searchValue.toLowerCase();

      return login.includes(searchValue) || sign.includes(searchValue);
    });
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  shouldNotificationSoundPlay(state) {
    this.setState({
      notificationSoundShouldPlay: state
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Chat updated.');

    if (
      prevProps.messages !== this.props.messages
      && this.props.messages[this.props.messages.length - 1].id !== this.props.clientID
      && this.state.notificationSoundShouldPlay
    )
      NOTIFICATION_SOUND.play();
  }

  render() {
    return (
      <Chat
        clientID={this.props.clientID}
        displaySidePanel={this.displaySidePanel}
        displaySidePanelOnMobile={this.state.displaySidePanelOnMobile}
        fadeComponent={this.getFadeComponent()}
        handleChatClick={this.handleChatClick}
        handleMsgBoxChange={this.props.handleMsgBoxChange}
        handleMsgBoxKeyUp={this.props.handleMsgBoxKeyUp}
        handleMsgDelete={this.props.handleMsgDelete}
        handleSearchChange={this.handleSearchChange}
        isMobileVersion={this.props.isMobileVersion}
        lang={this.props.lang}
        messages={this.props.messages}
        messageValue={this.props.messageValue}
        searchValue={this.state.searchValue}
        shouldNotificationSoundPlay={this.shouldNotificationSoundPlay}
        userList={this.getFilteredUserList()}
      />
    );
  }
}
