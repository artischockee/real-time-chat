import React from 'react';
import PropTypes from 'prop-types';

const SVGNotificationsOff = props => {
  return (
    <svg className={props.className} width="512" height="512" viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    	<g>
    		<path d="m242.25 510c28.05 0 51-22.95 51-51h-102c0 28.05 22.95 51 51 51zm165.75-293.25c0-79.05-53.55-142.8-127.5-160.65v-17.85c0-20.4-17.85-38.25-38.25-38.25s-38.25 17.85-38.25 38.25v17.85c-12.75 2.55-25.5 7.65-35.7 12.75l239.7 239.7v-91.8zm-7.65 216.75 51 51 33.15-33.15-425.85-425.85-33.15 33.15 73.95 73.95c-15.3 25.5-22.95 53.55-22.95 84.15v140.25l-51 51v25.5h374.85z"/>
    	</g>
    </svg>
  );
};

SVGNotificationsOff.propTypes = {
  className: PropTypes.string.isRequired
};

export default SVGNotificationsOff;
