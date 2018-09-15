import React from 'react';
import PropTypes from 'prop-types';
import FormSectionContainer from '../containers/form-section';

const EntryMain = (props) => {
  return (
    <div className="entry-main">
      <div className="entry-form">
        <h1 className="entry-form__title">
          {props.title}
        </h1>

        <form id="entry-form" className="entry-form__form">

          <FormSectionContainer
            handleChange={props.handleChange}
            highlightedDueToError={props.loginData.highlighted}
            inputName="login"
            inputType="text"
            inputValue={props.loginValue}
            isRequired={props.loginData.isRequired}
            lang={props.lang}
            labelValue={props.loginLabel}
          />

          <FormSectionContainer
            handleChange={props.handleChange}
            highlightedDueToError={props.signData.highlighted}
            inputName="sign"
            inputType="text"
            inputValue={props.signValue}
            isRequired={props.signData.isRequired}
            lang={props.lang}
            labelValue={props.signLabel}
          />

          {/* <div className="form-section">
                <label className="form-section__label" htmlFor="input-image">Image</label>
                <input form="entry-form-form" type="file" accept="image/*" id="input-image" />
            </div> */}

          <input className="submit" form="entry-form" type="submit" value={props.submit} onClick={props.handleConnect} />

        </form>
      </div>
    </div>
  );
};

EntryMain.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleConnect: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  loginData: PropTypes.object.isRequired,
  loginLabel: PropTypes.string.isRequired,
  loginValue: PropTypes.string.isRequired,
  signData: PropTypes.object.isRequired,
  signLabel: PropTypes.string.isRequired,
  signValue: PropTypes.string.isRequired,
  submit: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default EntryMain;
