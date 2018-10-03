import React from 'react';
import PropTypes from 'prop-types';
import EntryBoxContainer from '../containers/entry-box';

const Entry = props => {
  return (
    <div className={props.classList}>
      <EntryBoxContainer
        handleConnect={props.handleConnect}
        handleLogInInputChange={props.handleLogInInputChange}
        userData={props.userData}
      />
    </div>
  );
};

Entry.propTypes = {
  classList: PropTypes.string.isRequired
};

export default Entry;
