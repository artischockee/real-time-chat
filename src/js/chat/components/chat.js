import React from 'react';
import PropTypes from 'prop-types';
import SidePanelContainer from '../containers/side-panel';
import MainPanelContainer from '../containers/main-panel';

const Chat = (props) => {
  return (
    <div className="chat">

      <SidePanelContainer
        userList={props.userList}
      />

      <MainPanelContainer
        lang={props.lang}
        messages={props.messages}
      />

    </div>
  );
};

Chat.propTypes = {

};

export default Chat;
