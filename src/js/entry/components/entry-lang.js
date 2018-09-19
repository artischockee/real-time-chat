import React from 'react';
import PropTypes from 'prop-types';

const EntryLang = props => {
  return (
    <div className="entry__lang-wrapper">
      <ul className="entry__lang-list">
        {props.listItems}
      </ul>
    </div>
  );
};

EntryLang.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EntryLang;
