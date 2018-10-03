import React from 'react';
import PropTypes from 'prop-types';
import EntryBox from './entry-box';

const Entry = props => {
  return (
    <div className={props.classList}>
      <EntryBox
        handleConnect={props.handleConnect}
        handleLogInInputChange={props.handleLogInInputChange}
        userData={props.userData}
      />
    </div>
  );
};

Entry.propTypes = {
  classList: PropTypes.string.isRequired,
  handleConnect: PropTypes.func.isRequired,
  handleLogInInputChange: PropTypes.func.isRequired,
  userData: PropTypes.object
};

export default Entry;
