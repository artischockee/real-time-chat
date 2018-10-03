import React from 'react';
import PropTypes from 'prop-types';

const SVGHamburger = props => {
  return (
    <svg className={props.className} viewBox="0 0 459 459" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z"/>
    </svg>
  );
};

SVGHamburger.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SVGHamburger;
