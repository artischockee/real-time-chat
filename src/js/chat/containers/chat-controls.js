import React from 'react';
import autobind from 'autobind-decorator';
import ChatControls from '../components/chat-controls';
import SVGNotificationsOn from '../../svg-components/notifications-on';
import SVGNotificationsOff from '../../svg-components/notifications-off';
import { CHAT_BUTTONS } from '../../auxiliary/button-names';

@autobind
export default class ChatControlsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsEnabled: true
    };
  }

  switchNotificationIcon() {
    let notificationsEnabled = !this.state.notificationsEnabled;

    this.setState({
      notificationsEnabled
    });

    this.props.shouldNotificationSoundPlay(notificationsEnabled);
  }

  getNotificationIcon() {
    if (this.state.notificationsEnabled)
      return <SVGNotificationsOn className="control-button__svg" />;
    else
      return <SVGNotificationsOff className="control-button__svg" />;
  }

  handleClick(event) {
    switch (event.target.name) {
      case CHAT_BUTTONS.NOTIFICATIONS:
        this.switchNotificationIcon();
        break;
      case CHAT_BUTTONS.DEL_MESSAGES:
        this.props.handleMsgDelete();
        break;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('ChatControls updated.');
  }

  render() {
    return (
      <ChatControls
        handleClick={this.handleClick}
        notificationIcon={this.getNotificationIcon()}
      />
    );
  }
}
