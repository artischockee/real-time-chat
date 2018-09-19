import React from 'react';
import autobind from 'autobind-decorator';
import MainPanel from '../components/main-panel';

@autobind
export default class MainPanelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainPanel
        handleMsgBoxChange={this.props.handleMsgBoxChange}
        handleMsgBoxKeyUp={this.props.handleMsgBoxKeyUp}
        lang={this.props.lang}
        messages={this.props.messages}
        messageValue={this.props.messageValue}
        shouldNotificationSoundPlay={this.props.shouldNotificationSoundPlay}
      />
    );
  }
}
