import React from 'react';
import PropTypes from 'prop-types';
import FormSectionContainer from '../containers/form-section';

const EntryMain = props => {
  return (
    <div className="entry-main">
      <div className="entry-form">
        <h1 className="entry-form__title">
          Log in to continue
        </h1>

        <form id="entry-form" className="entry-form__form">

          <FormSectionContainer
            handleChange={props.handleChange}
            highlightedDueToError={props.loginData.highlighted}
            inputName="login"
            inputType="text"
            inputValue={props.loginValue}
            isRequired={props.loginData.isRequired}
            labelValue="Login"
          />

          <FormSectionContainer
            handleChange={props.handleChange}
            highlightedDueToError={props.signData.highlighted}
            inputName="sign"
            inputType="text"
            inputValue={props.signValue}
            isRequired={props.signData.isRequired}
            labelValue="Sign"
          />

          {/* <div className="form-section">
                <label className="form-section__label" htmlFor="input-image">Image</label>
                <input form="entry-form-form" type="file" accept="image/*" id="input-image" />
            </div> */}

          <input className="submit" form="entry-form" type="submit" value="Log in" onClick={props.handleConnect} />

        </form>
      </div>
    </div>
  );
};

EntryMain.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleConnect: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired,
  loginValue: PropTypes.string.isRequired,
  signData: PropTypes.object.isRequired,
  signValue: PropTypes.string.isRequired
};

export default EntryMain;
