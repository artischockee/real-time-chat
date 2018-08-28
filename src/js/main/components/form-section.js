import React from 'react';
import PropTypes from 'prop-types';

const FormSection = (props) => {
  return (
    <div className='form-section'>
      <label className={props.labelClassList} htmlFor={props.inputID}>
        {props.labelValue} {props.labelOptionalSpan}
      </label>

      <input className={props.inputClassList}
        type={props.inputType}
        id={props.inputID}
        onFocus={props.handleFocus}
        onBlur={props.handleFocus}
        onChange={props.handleChange}
        value={props.inputValue}
        name={props.inputName}
        required={props.isRequired}
      />

      <p className={props.descriptionClassList}>
        {props.description}
      </p>
    </div>
  );
};

FormSection.propTypes = {
  description: PropTypes.string,
  descriptionClassList: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  inputID: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  labelClassList: PropTypes.string.isRequired,
  labelOptionalSpan: PropTypes.object,
  labelValue: PropTypes.string.isRequired
};

export default FormSection;
