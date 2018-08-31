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

};

export default Chat;
