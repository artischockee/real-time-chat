import React from 'react';
import PropTypes from 'prop-types';

const Chat = (props) => {
  return (
    <section className="chat">
      {props.loginBoxContainer}

      <div className="line-top">
        <h1 className="line-top__section-title">{props.title}</h1>
      </div>

      <div className="main-section" ref={props.windowRef} onScroll={props.handleScroll}>
        {props.emptyChatPlaceholder}
        {props.messages}
      </div>

      <div className="line-bottom">
        <input
          className="chat__input"
          disabled={props.controlsAreFrozen}
          id="chat-input"
          onChange={props.handleMessageBoxChange}
          onKeyUp={props.handleMessageBoxEnterKeyPress}
          placeholder={props.placeholder}
          type="text"
          value={props.messageValue}
        />
        <button
          className="chat__button"
          type="button"
          id="chat-button"
          onClick={props.handleMessageSending}
          disabled={props.controlsAreFrozen}>
          {props.send}
        </button>
      </div>

    </section>
  );
};

Chat.propTypes = {
  controlsAreFrozen: PropTypes.bool.isRequired,
  handleMessageBoxChange: PropTypes.func.isRequired,
  handleMessageBoxEnterKeyPress: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired,
  handleScroll: PropTypes.func.isRequired,
  loginBoxContainer: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  messageValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Chat;
