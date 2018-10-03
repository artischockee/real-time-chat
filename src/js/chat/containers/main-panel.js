import React from 'react';
import autobind from 'autobind-decorator';
import MainPanel from '../components/main-panel';

@autobind
export default class MainPanelContainer extends React.Component {
  render() {
    return (
      <MainPanel
        clientID={this.props.clientID}
        displaySidePanel={this.props.displaySidePanel}
        handleMsgBoxChange={this.props.handleMsgBoxChange}
        handleMsgBoxKeyUp={this.props.handleMsgBoxKeyUp}
        handleMsgDelete={this.props.handleMsgDelete}
        messages={this.props.messages}
        messageValue={this.props.messageValue}
        shouldNotificationSoundPlay={this.props.shouldNotificationSoundPlay}
      />
    );
  }
}
