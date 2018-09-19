import React from 'react';
import PropTypes from 'prop-types';
import EntryBoxContainer from '../containers/entry-box';
import EntryLangContainer from '../containers/entry-lang';

const Entry = props => {
  return (
    <div className={props.classList}>
      <EntryBoxContainer
        handleConnect={props.handleConnect}
        handleLogInInputChange={props.handleLogInInputChange}
        lang={props.lang}
        userData={props.userData}
      />

      <EntryLangContainer
        changeLanguage={props.handleLangChange}
      />
    </div>
  );
};

Entry.propTypes = {
  classList: PropTypes.string.isRequired,
  handleLangChange: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default Entry;
