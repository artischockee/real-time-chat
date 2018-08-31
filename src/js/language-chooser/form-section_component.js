import React from 'react';
import PropTypes from 'prop-types';

const FormSection = (props) => {
  return (
    <div className="lang-chooser-form__section">
      <label className={props.labelClassList}>
        {props.label}

        <div className="flags-radio-wrapper">
          <div className="flags-wrapper">
            {props.flagsSet}
          </div>
          <div className="custom-radio-wrapper">
            <input
              checked={props.checked}
              className="input"
              name={props.ownLang}
              onChange={props.handleChange}
              type="radio"
            />
            <span className="checkmark"></span>
          </div>
        </div>
      </label>
    </div>
  );
};

FormSection.propTypes = {
  checked: PropTypes.bool.isRequired,
  flagsSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelClassList: PropTypes.string.isRequired,
  ownLang: PropTypes.string.isRequired
};

export default FormSection;
