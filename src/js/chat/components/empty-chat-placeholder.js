import React from 'react';
import PropTypes from 'prop-types';
import SVGLogo from '../../svg-components/logo';

const EmptyChatPlaceholder = props => {
  return (
    <div className="empty-chat-placeholder">

      <SVGLogo className="empty-chat-placeholder__svg" />

      <p className="empty-chat-placeholder__text">
        Chat messages will be displayed here.
      </p>

    </div>
  );
};

export default EmptyChatPlaceholder;
