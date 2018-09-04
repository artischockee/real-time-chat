import React from 'react';
import PropTypes from 'prop-types';

const LoginBox = (props) => {
  return (
    <div className={props.classList}>
      {props.fragment}
    </div>
  );
};

LoginBox.propTypes = {
  classList: PropTypes.string.isRequired,
  fragment: PropTypes.object.isRequired
};

export default LoginBox;
