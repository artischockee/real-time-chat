import React from 'react';
import autobind from 'autobind-decorator';
import FormSection from '../components/form-section';

@autobind
export default class FormSectionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.className = 'form-section';

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
    let classList = `${this.className}__description`;

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
    let classList = `${this.className}__label`;

    if (this.state.inputInFocus)
      classList += ` ${classList}_replaced`;

    if (this.props.highlightedDueToError)
      classList += ` ${classList}_highlighted`;

    return classList;
  }

  getInputClassList() {
    let classList = `${this.className}__input`;

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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.inputValue !== this.props.inputValue
  //   || nextState.inputInFocus !== this.state.inputInFocus
  //   || nextProps.highlightedDueToError !== this.props.highlightedDueToError
  //   || nextProps.inputName !== this.props.inputName)
  //     return true;
  //   else
  //     return false;
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`FormSection (${prevProps.inputName}) updated.`);
  }

  render() {
    return (
      <FormSection
        className={this.className}
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
