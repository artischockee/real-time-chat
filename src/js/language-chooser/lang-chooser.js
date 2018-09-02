import React from 'react';
import autobind from 'autobind-decorator';
import LangChooser from './lang-chooser_component';

const SUBMIT = {
  en: 'Confirm',
  ru: 'Подтвердить'
};

@autobind
export default class LangChooserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedLanguage: 'en',
      fadeOutBeforeUnmount: false
    };
  }

  getWrapperClassList() {
    let classList = 'fullscreen-wrapper';

    if (this.state.fadeOutBeforeUnmount)
      classList += ` ${classList}_fade-out`;

    return classList;
  }

  handleChange(event) {
    let checkedLanguage = event.target.name;

    this.setState({ checkedLanguage });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      fadeOutBeforeUnmount: true
    });

    this.props.handleSubmit(this.state.checkedLanguage);
  }

  render() {
    return (
      <LangChooser
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        lang={this.state.checkedLanguage}
        submitValue={SUBMIT[this.state.checkedLanguage]}
        wrapperClassList={this.getWrapperClassList()}
      />
    );
  }
}
