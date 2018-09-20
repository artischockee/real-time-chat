import React from 'react';
import PropTypes from 'prop-types';

const SVGThreeDots = props => {
  return (
    <svg className={props.className} viewBox="0 0 408 408" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  		<path d="m204 102c28.05 0 51-22.95 51-51s-22.95-51-51-51-51 22.95-51 51 22.95 51 51 51zm0 51c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm0 153c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z"/>
    </svg>
  );
};

SVGThreeDots.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SVGThreeDots;
