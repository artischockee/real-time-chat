import React from 'react';
import autobind from 'autobind-decorator';
import FormSection from '../components/form-section';

@autobind
export default class FormSectionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputInFocus: false
    };
  }

  getOptionalSpan() {
    if (this.props.isRequired)
      return null;
    else
      return <span className="span-optional">Optional</span>;
  }

  getDescriptionClassList() {
    let classList = 'form-section__description';

    if (
      this.props.description === ''
      || this.props.description === undefined
      || this.props.description === null
    )
      classList += ` ${classList}_empty`;

    if (this.props.highlightedDueToError && !this.state.inputInFocus)
      classList += ` ${classList}_highlighted`;

    return classList;
  }

  getLabelClassList() {
    let classList = 'form-section__label';

    if (this.state.inputInFocus)
      classList += ` ${classList}_replaced`;

    if (this.props.highlightedDueToError)
      classList += ` ${classList}_highlighted`;

    return classList;
  }

  getInputClassList() {
    let classList = 'form-section__input';

    if (this.props.highlightedDueToError)
      classList += ` ${classList}_highlighted`;

    return classList;
  }

  handleFocus(event) {
    if (event.target.value !== '')
      return;

    let inputInFocus = this.state.inputInFocus ? false : true;

    this.setState({
      inputInFocus
    });
  }

  render() {
    return (
      <FormSection
        description={this.props.description}
        descriptionClassList={this.getDescriptionClassList()}
        handleChange={this.props.handleChange}
        handleFocus={this.handleFocus}
        inputClassList={this.getInputClassList()}
        inputID={this.props.inputID}
        inputName={this.props.inputName}
        inputType={this.props.inputType}
        inputValue={this.props.inputValue}
        isRequired={this.props.isRequired}
        labelClassList={this.getLabelClassList()}
        labelValue={this.props.labelValue}
        labelOptionalSpan={this.getOptionalSpan()}
      />
    );
  }
}
