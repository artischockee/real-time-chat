import React from 'react';
import PropTypes from 'prop-types';
import ChatControlsContainer from '../containers/chat-controls';
import ChatBoxContainer from '../containers/chat-box';
import ChatInput from '../components/chat-input';

const MainPanel = props => {
  return (
    <section className="chat__main-panel">

      <ChatControlsContainer
        displaySidePanel={props.displaySidePanel}
        handleMsgDelete={props.handleMsgDelete}
        shouldNotificationSoundPlay={props.shouldNotificationSoundPlay}
      />

      <ChatBoxContainer
        clientID={props.clientID}
        messages={props.messages}
      />

      <ChatInput
        handleMsgBoxChange={props.handleMsgBoxChange}
        handleMsgBoxKeyUp={props.handleMsgBoxKeyUp}
        messageValue={props.messageValue}
      />

    </section>
  );
};

MainPanel.propTypes = {
  clientID: PropTypes.number.isRequired,
  displaySidePanel: PropTypes.func.isRequired,
  handleMsgBoxChange: PropTypes.func.isRequired,
  handleMsgBoxKeyUp: PropTypes.func.isRequired,
  handleMsgDelete: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  messageValue: PropTypes.string,
  shouldNotificationSoundPlay: PropTypes.func.isRequired
};

export default MainPanel;
