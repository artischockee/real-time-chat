import React from 'react';
import autobind from 'autobind-decorator';
import FormSection from './form-section_component';

const LABELS = {
  en: 'English',
  ru: 'Русский'
};

// Used for detecting svg flags in the resources folder
const LANGS = {
  en: [ 'uk', 'us' ],
  ru: [ 'ru' ]
};

@autobind
export default class FormSectionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  isChecked() {
    return this.props.ownLang === this.props.lang;
  }

  getFlagsSet() {
    let ownLangCountries = LANGS[this.props.ownLang];

    return ownLangCountries.map((country, index) => {
      return (
        <img
          alt={`flag:${country}`}
          className="svg"
          key={index}
          src={`images/lang/${country}.svg`}
        />
      );
    });
  }

  getLabelClassList() {
    let classList = 'label';

    if (this.props.ownLang === this.props.lang)
      classList += ` ${classList}_highlighted`;

    return classList;
  }

  render() {
    return (
      <FormSection
        checked={this.isChecked()}
        flagsSet={this.getFlagsSet()}
        handleChange={this.props.handleChange}
        label={LABELS[this.props.ownLang]}
        labelClassList={this.getLabelClassList()}
        lang={this.props.lang}
        ownLang={this.props.ownLang}
      />
    );
  }
}
