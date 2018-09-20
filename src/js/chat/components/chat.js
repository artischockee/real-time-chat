import React from 'react';
import PropTypes from 'prop-types';
import SidePanelContainer from '../containers/side-panel';
import MainPanelContainer from '../containers/main-panel';

const Chat = props => {
  return (
    <div className="chat">

      <SidePanelContainer
        handleSearchChange={props.handleSearchChange}
        searchValue={props.searchValue}
        userList={props.userList}
      />

      <MainPanelContainer
        clientID={props.clientID}
        handleMsgBoxChange={props.handleMsgBoxChange}
        handleMsgBoxKeyUp={props.handleMsgBoxKeyUp}
        handleMsgDelete={props.handleMsgDelete}
        lang={props.lang}
        messages={props.messages}
        messageValue={props.messageValue}
        shouldNotificationSoundPlay={props.shouldNotificationSoundPlay}
      />

    </div>
  );
};

Chat.propTypes = {
  handleMsgBoxChange: PropTypes.func.isRequired,
  handleMsgBoxKeyUp: PropTypes.func.isRequired,
  handleMsgDelete: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  messageValue: PropTypes.string,
  msgDeleteDialog: PropTypes.object,
  shouldNotificationSoundPlay: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.object)
};

export default Chat;
