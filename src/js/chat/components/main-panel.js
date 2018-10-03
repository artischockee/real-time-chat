import React from 'react';
import PropTypes from 'prop-types';
import ChatControlsContainer from '../containers/chat-controls';
import ChatBoxContainer from '../containers/chat-box';
import ChatInputContainer from '../containers/chat-input';

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
        lang={props.lang}
        messages={props.messages}
      />

      <ChatInputContainer
        handleMsgBoxChange={props.handleMsgBoxChange}
        handleMsgBoxKeyUp={props.handleMsgBoxKeyUp}
        messageValue={props.messageValue}
      />

    </section>
  );
};

MainPanel.propTypes = {

};

export default MainPanel;
