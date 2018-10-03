import React from 'react';
import PropTypes from 'prop-types';
import SidePanelContainer from '../containers/side-panel';
import MainPanel from './main-panel';

const Chat = props => {
  return (
    <div className="chat">

      <SidePanelContainer
        displaySidePanelOnMobile={props.displaySidePanelOnMobile}
        handleSearchChange={props.handleSearchChange}
        isMobileVersion={props.isMobileVersion}
        searchValue={props.searchValue}
        userList={props.userList}
      />

      {props.fadeComponent}

      <MainPanel
        clientID={props.clientID}
        displaySidePanel={props.displaySidePanel}
        handleMsgBoxChange={props.handleMsgBoxChange}
        handleMsgBoxKeyUp={props.handleMsgBoxKeyUp}
        handleMsgDelete={props.handleMsgDelete}
        messages={props.messages}
        messageValue={props.messageValue}
        shouldNotificationSoundPlay={props.shouldNotificationSoundPlay}
      />

    </div>
  );
};

Chat.propTypes = {
  fadeComponent: PropTypes.object,
  handleMsgBoxChange: PropTypes.func.isRequired,
  handleMsgBoxKeyUp: PropTypes.func.isRequired,
  handleMsgDelete: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  messageValue: PropTypes.string,
  msgDeleteDialog: PropTypes.object,
  shouldNotificationSoundPlay: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.object)
};

export default Chat;
