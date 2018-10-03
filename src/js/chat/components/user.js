import React from 'react';
import PropTypes from 'prop-types';

const User = props => {
  return (
    <li className="user-list__user">
      <div className="user__image-wrapper">
        <img className="user__image" src={props.imgSrc} alt={`${props.login}\'s avatar`} />
      </div>
      <div className="user__info-wrapper">
        <p className="user__name">{props.login}</p>
        {props.signElement}
      </div>
    </li>
  );
};

User.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  signElement: PropTypes.object
};

export default User;
