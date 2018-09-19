import React from 'react';
import PropTypes from 'prop-types';

const ChatBox = props => {
  return (
    <div className="main-panel__chat-container">

      {props.emptyChatPlaceholder}
      {props.messages}

    </div>
  );
};

ChatBox.propTypes = {
  emptyChatPlaceholder: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object)
};

export default ChatBox;
