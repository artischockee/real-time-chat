import React from 'react';
import PropTypes from 'prop-types';

const UserMessages = (props) => {
  return (
    <div className="user-messages">
      <div className="user-messages__image-wrapper">
        <img
          className="user-messages__image"
          src={props.image}
          alt={`${props.login}\'s avatar`}
        />
      </div>
      <div className="user-messages__data-wrapper">
        <div className="user-messages__line-wrapper">
          <p className="name">{props.login}</p>
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
  image: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  time: PropTypes.string.isRequired
};

export default UserMessages;
