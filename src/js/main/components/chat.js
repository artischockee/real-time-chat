import React from 'react';
import PropTypes from 'prop-types';

const Chat = (props) => {
  return (
    <section className="chat">
      {props.loginBoxContainer}

      <div className="section-header">
        <h1 className="section-header__h1">Chat</h1>
      </div>

      <div className="section-main">
        {props.messages}
      </div>

      <div className="section-footer">
        <input className="chat__input" id="chat-input" type="text" placeholder="Write your message.." onChange={props.handleMessageBoxChange} value={props.messageValue} disabled={props.controlsAreFrozen} />
        <button className="chat__button" type="button" id="chat-button" onClick={props.handleMessageSending} disabled={props.controlsAreFrozen}>Send</button>
      </div>

    </section>
  );
};

Chat.propTypes = {

};

export default Chat;
