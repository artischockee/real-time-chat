import React from 'react';
import PropTypes from 'prop-types';
import { APP_NAME } from '../../auxiliary/app-name';
import SVGTrashCan from '../../svg-components/trash-can';




import { BTN_NAMES } from '../../auxiliary/chat-button-names';

const ChatControls = props => {
  return (
    <div className="main-panel__controls-container">

      <p className="main-panel__inscription">{APP_NAME}</p>

      <div className="main-panel__chat-controls">

        <button name={BTN_NAMES.NOTIFICATIONS} className="chat__control-button" onClick={props.handleClick}>
          {props.notificationIcon}
        </button>

        <button name={BTN_NAMES.DEL_MESSAGES} className="chat__control-button" onClick={props.handleClick}>
          <SVGTrashCan className="control-button__svg" />
        </button>

      </div>

    </div>
  );
};

ChatControls.propTypes = {

};

export default ChatControls;
