import React from 'react';
import PropTypes from 'prop-types';
import SidePanelContainer from '../containers/side-panel';
import MainPanelContainer from '../containers/main-panel';

const Chat = props => {
  return (
    <div className="chat">

      <SidePanelContainer
        userList={props.userList}
      />

      <MainPanelContainer
        handleMsgBoxChange={props.handleMsgBoxChange}
        handleMsgBoxKeyUp={props.handleMsgBoxKeyUp}
        lang={props.lang}
        messages={props.messages}
        messageValue={props.messageValue}
        shouldNotificationSoundPlay={props.shouldNotificationSoundPlay}
      />

    </div>
  );
};

Chat.propTypes = {

};

export default Chat;
