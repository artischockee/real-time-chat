import React from 'react';
import autobind from 'autobind-decorator';
import Header from './header_comp';

const TITLE = {
  en: 'Real-time chat',
  ru: 'Real-time чат'
};

const DESCRIPTION = {
  en: 'Greetings!',
  ru: 'Приветствуем!'
};

@autobind
export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassList() {
    let className = 'header';

    if (this.props.mayBeDisabled)
      className += ' header_may-be-disabled';

    return className;
  }

  render() {
    return (
      <Header
        classList={this.getClassList()}
        description={DESCRIPTION[this.props.lang]}
        title={TITLE[this.props.lang]}
      />
    );
  }
}
