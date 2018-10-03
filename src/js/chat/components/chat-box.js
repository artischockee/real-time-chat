import React from 'react';
import PropTypes from 'prop-types';

const ChatBox = props => {
  return (
    <div
      className="main-panel__chat-container"
      onScroll={props.handleScroll}
      ref={props.windowRef}>

      {props.emptyChatPlaceholder}
      {props.messages}

    </div>
  );
};

ChatBox.propTypes = {
  emptyChatPlaceholder: PropTypes.object,
  handleScroll: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object)
};

export default ChatBox;
