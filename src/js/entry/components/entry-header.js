import React from 'react';
import PropTypes from 'prop-types';
import SVGLogo from '../../svg-components/logo';

const EntryHeader = (props) => {
  return (
    <div className="entry-header">
      <SVGLogo className="entry-header__logo" />
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
