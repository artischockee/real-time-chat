import React from 'react';
import PropTypes from 'prop-types';

const UsersOnline = (props) => {
  return (
    <section className={props.classList}>

      <div className="section-header">
        <h1 className="section-header__h1">Users online</h1>
      </div>

      <div className="section-main">
        <ul className="users-list">
          {props.usersData}
        </ul>
      </div>

      <div className="section-footer">
        <h2 className="section-footer__h2">Currently online: <span>{props.currentlyOnline}</span></h2>
      </div>
    </section>
  );
};

UsersOnline.propTypes = {
  classList: PropTypes.string.isRequired,
  currentlyOnline: PropTypes.number.isRequired,
  usersData: PropTypes.arrayOf(PropTypes.object)
};

export default UsersOnline;
