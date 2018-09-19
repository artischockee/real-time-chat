import React from 'react';
import PropTypes from 'prop-types';

const LoginBoxLoading = props => {
  return (
    <div className={props.classList}>
      <p className="inscription">{props.inscription}</p>
      <div class="spinner"></div>
    </div>
  );
};

LoginBoxLoading.propTypes = {
  classList: PropTypes.string.isRequired,
  inscription: PropTypes.string.isRequired
};

export default LoginBoxLoading;
