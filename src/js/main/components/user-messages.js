import React from 'react';
import PropTypes from 'prop-types';

const UserMessages = (props) => {
  return (
    <div className="user-messages">
      <div className="user-messages__image-wrapper">
        <img className="user-messages__image" src='images/blank-avatar.jpg' />
      </div>
      <div className="user-messages__data-wrapper">
        <div className="user-messages__line-wrapper">
          <h3 className="name">{props.login}</h3>
          <p className="sign">{props.sign}</p>
          <p className="message-time">{props.time}</p>
        </div>
        <ul className="messages-bunch">
          {props.messages}
        </ul>
      </div>
    </div>
  );
};

UserMessages.propTypes = {
  login: PropTypes.string.isRequired,
  sign: PropTypes.string,
  time: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UserMessages;
