import React from 'react';
import PropTypes from 'prop-types';
import UserListContainer from '../containers/user-list';

const SidePanel = props => {
  return (
    <section className="chat__side-panel">

      <div className="side-panel__search-container">
        <input className="side-panel__search-field" type="text" placeholder="Search" size="20" />
      </div>

      <div className="side-panel__online-container">
        <UserListContainer
          userList={props.userList}
        />
      </div>

      <div className="side-panel__controls-container">
        <h5 style={{ margin: '0' }}>bottom</h5>
      </div>
    </section>
  );
};

SidePanel.propTypes = {

};

export default SidePanel;
