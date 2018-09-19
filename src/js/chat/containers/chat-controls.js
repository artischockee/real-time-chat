import React from 'react';
import autobind from 'autobind-decorator';
import ChatControls from '../components/chat-controls';
import SVGNotificationsOn from '../../svg-components/notifications-on';
import SVGNotificationsOff from '../../svg-components/notifications-off';
import { BTN_NAMES } from '../../auxiliary/chat-button-names';

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
      case BTN_NAMES.NOTIFICATIONS:
        this.switchNotificationIcon();
        break;
      case BTN_NAMES.DEL_MESSAGES:

        break;
      default:

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
