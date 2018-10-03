import React from 'react';
import PropTypes from 'prop-types';

const SVGNotificationsOn = props => {
  return (
    <svg className={props.className} width="510" height="510" viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g>
        <path d="m255 510c28.05 0 51-22.95 51-51h-102c0 28.05 22.95 51 51 51zm165.75-153v-140.25c0-79.05-53.55-142.8-127.5-160.65v-17.85c0-20.4-17.85-38.25-38.25-38.25s-38.25 17.85-38.25 38.25v17.85c-73.95 17.85-127.5 81.6-127.5 160.65v140.25l-51 51v25.5h433.5v-25.5l-51-51z" />
      </g>
    </svg>
  );
};

SVGNotificationsOn.propTypes = {
  className: PropTypes.string.isRequired
};

export default SVGNotificationsOn;
