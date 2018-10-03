import React from 'react';
import PropTypes from 'prop-types';
import SVGClose from '../../svg-components/close';
import { DIALOG_BUTTONS } from '../../auxiliary/button-names';

const MsgDeleteDialog = props => {
  return (
    <div className="dialog-wrapper">
      <div className="msg-delete-dialog">
        <div className="msg-delete-dialog__title">
          <p className="title__text">Delete all messages</p>
          <button name={DIALOG_BUTTONS.CLOSE} className="title__button" onClick={props.handleClick}>
            <SVGClose className="button__svg" />
          </button>
        </div>

        <div className="msg-delete-dialog__body">
          <p className="body__text">Are you sure you want to <span className="body__span body__span_bold">clear entire message history?</span></p>
          <p className="body__text">This action <span className="body__span body__span_bold">cannot</span> be undone.</p>
        </div>

        <div className="msg-delete-dialog__controls">
          <button name={DIALOG_BUTTONS.NO} className="controls__button" onClick={props.handleClick}>Cancel</button>
          <button name={DIALOG_BUTTONS.YES} className="controls__button controls__button_primary" onClick={props.handleClick}>Delete</button>
        </div>
      </div>
    </div>
  );
};

MsgDeleteDialog.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default MsgDeleteDialog;
