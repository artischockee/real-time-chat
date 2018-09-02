import React from 'react';
import PropTypes from 'prop-types';
import FormSectionContainer from '../containers/form-section';

const LoginBox = (props) => {
  return (
    <div className={props.classList}>

      <h1 className="login-box__title">{props.title}</h1>

      <form action="" id="login-box-form"
        className="login-box__form">

        <FormSectionContainer
          description={props.formLogin.description}
          handleChange={props.handleChange}
          highlightedDueToError={props.loginData.highlighted}
          inputName="login"
          inputType="text"
          inputValue={props.loginValue}
          isRequired={props.loginData.isRequired}
          lang={props.lang}
          labelValue={props.formLogin.label}
        />

        <FormSectionContainer
          description={props.formSign.description}
          handleChange={props.handleChange}
          highlightedDueToError={props.signData.highlighted}
          inputName="sign"
          inputType="text"
          inputValue={props.signValue}
          isRequired={props.signData.isRequired}
          lang={props.lang}
          labelValue={props.formSign.label}
        />

        {
          /* <div className="form-section">
              <label className="form-section__label" htmlFor="input-image">Image</label>
              <input form="login-box-form" type="file" accept="image/*" id="input-image" />
          </div> */
        }

        <input className="submit" form="login-box-form" type="submit" value={props.submit} onClick={props.handleConnect} />

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
