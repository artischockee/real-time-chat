import React from 'react';
import PropTypes from 'prop-types';
import EntryHeaderContainer from '../containers/entry-header';
import EntryMainContainer from '../containers/entry-main';

const EntryBox = props => {
  return (
    <div className="entry__box-wrapper">

      <EntryHeaderContainer lang={props.lang} />

      <EntryMainContainer
        handleConnect={props.handleConnect}
        handleInputChange={props.handleLogInInputChange}
        lang={props.lang}
        userData={props.userData}
      />

    </div>
  );
};

EntryBox.propTypes = {
  lang: PropTypes.string.isRequired
};

export default EntryBox;
