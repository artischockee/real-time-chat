import React from 'react';
import PropTypes from 'prop-types';
import FormSectionContainer from './form-section';

const LangChooser = (props) => {
  return (
    <div className={props.wrapperClassList}>
      <div className="language-chooser">
        <form action="" className="lang-chooser-form" onSubmit={props.handleSubmit}>

          <FormSectionContainer
            handleChange={props.handleChange}
            lang={props.lang}
            ownLang="en"
          />

          <FormSectionContainer
            handleChange={props.handleChange}
            lang={props.lang}
            ownLang="ru"
          />

          <input className="lang-chooser-form__submit" type="submit" value={props.submitValue} />

        </form>
      </div>
    </div>
  );
};

LangChooser.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  submitValue: PropTypes.string.isRequired,
  wrapperClassList: PropTypes.string.isRequired
};

export default LangChooser;
