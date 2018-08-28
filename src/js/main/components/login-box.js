import React from 'react';
import PropTypes from 'prop-types';
import FormSectionContainer from '../containers/form-section';

const LoginBox = (props) => {
  return (
    <div className={props.classList}>

      <h1 className="login-box__title">Log in to continue</h1>

      <form action="" id="login-box-form" className="login-box__form">

        <FormSectionContainer
          labelValue="Login"
          inputID="input-login"
          inputName="login"
          inputType="text"
          inputValue={props.loginValue}
          handleChange={props.handleChange}
          highlightedDueToError={props.loginData.highlighted}
          isRequired={props.loginData.isRequired}
          description="Could be your name, initials, nickname, etc."
        />

        <FormSectionContainer
          labelValue="Sign"
          inputID="input-sign"
          inputName="sign"
          inputType="text"
          inputValue={props.signValue}
          handleChange={props.handleChange}
          highlightedDueToError={props.signData.highlighted}
          isRequired={props.signData.isRequired}
          description="Could be your status, position, or simply your current mood - the choise is up to you."
        />

        {
          /* <div className="form-section">
              <label className="form-section__label" htmlFor="input-image">Image</label>
              <input form="login-box-form" type="file" accept="image/*" id="input-image" />
          </div> */
        }

        <input className="submit" form="login-box-form" type="submit" id="submit-and-connect" value="Log in" onClick={props.handleConnect} />

      </form>

    </div>
  );
};

LoginBox.propTypes = {
  classList: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleConnect: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired,
  loginValue: PropTypes.string.isRequired,
  signData: PropTypes.object.isRequired,
  signValue: PropTypes.string.isRequired
};

export default LoginBox;
