import React from 'react';
import PropTypes from 'prop-types';

const EntryHeader = (props) => {
  return (
    <div className="entry-header">
      <img className="entry-header__logo" src="images/logo.svg" alt="Logo" />
      <h1 className="entry-header__title">Real-time chat</h1>
      <ul className="entry-header__list">
        {props.listItems}
      </ul>
    </div>
  );
};

EntryHeader.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EntryHeader;
