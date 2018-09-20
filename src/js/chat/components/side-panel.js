import React from 'react';
import PropTypes from 'prop-types';
import UserListContainer from '../containers/user-list';
import SVGLens from '../../svg-components/lens';
import SVGThreeDots from '../../svg-components/three-dots';

const SidePanel = props => {
  return (
    <section className="chat__side-panel">

      <div className="side-panel__search-container">
        <div className="search-wrapper">
          <SVGLens className="search-wrapper__svg" />
          <input className="search-wrapper__search" type="text" placeholder="Search" value={props.searchValue} onChange={props.handleSearchChange} />
        </div>
      </div>

      <div className="side-panel__online-container">

        {props.noSearchMatchesElement}

        <UserListContainer userList={props.userList} />

      </div>

      <div className="side-panel__controls-container">
        <SVGThreeDots className="controls__svg" />
      </div>
    </section>
  );
};

SidePanel.propTypes = {

};

export default SidePanel;
