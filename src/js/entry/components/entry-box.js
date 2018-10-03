import React from 'react';
import PropTypes from 'prop-types';
import EntryHeaderContainer from '../containers/entry-header';
import EntryMainContainer from '../containers/entry-main';

const EntryBox = props => {
  return (
    <div className="entry__box-wrapper">

      <EntryHeaderContainer />

      <EntryMainContainer
        handleConnect={props.handleConnect}
        handleInputChange={props.handleLogInInputChange}
        userData={props.userData}
      />

    </div>
  );
};

EntryBox.propTypes = {
  
};

export default EntryBox;
