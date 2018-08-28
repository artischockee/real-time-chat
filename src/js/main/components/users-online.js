import React from 'react';
import PropTypes from 'prop-types';

const UsersOnline = (props) => {
  return (
    <section className={props.classList}>

      <div className="line-top">
        <h1 className="line-top__section-title">Users online</h1>
      </div>

      <div className="main-section">
        <ul className="users-list">
          {props.usersList}
        </ul>
      </div>

      <div className="line-bottom">
        <h2 className="line-bottom__online">Currently online: <span>{props.currentlyOnline}</span></h2>
      </div>
    </section>
  );
};

UsersOnline.propTypes = {
  classList: PropTypes.string.isRequired,
  currentlyOnline: PropTypes.number.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.object)
};

export default UsersOnline;
