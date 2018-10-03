import React from 'react';
import PropTypes from 'prop-types';
import SVGTrashCan from '../../svg-components/trash-can';
import SVGHamburger from '../../svg-components/hamburger';
import { APP_NAME } from '../../auxiliary/app-name';
import { CHAT_BUTTONS } from '../../auxiliary/button-names';

const ChatControls = props => {
  return (
    <div className="main-panel__controls-container">

      <button name={CHAT_BUTTONS.MENU} className="chat__control-button chat__control-button_menu" onClick={props.handleClick}>
        <SVGHamburger className="control-button__svg" />
      </button>

      <p className="main-panel__inscription">{APP_NAME}</p>

      <div className="main-panel__chat-controls">

        <button name={CHAT_BUTTONS.NOTIFICATIONS} className="chat__control-button" onClick={props.handleClick}>
          {props.notificationIcon}
        </button>

        <button name={CHAT_BUTTONS.DEL_MESSAGES} className="chat__control-button" onClick={props.handleClick}>
          <SVGTrashCan className="control-button__svg" />
        </button>

      </div>

    </div>
  );
};

ChatControls.propTypes = {
  handleClick: PropTypes.func.isRequired,
  notificationIcon: PropTypes.object.isRequired
};

export default ChatControls;
