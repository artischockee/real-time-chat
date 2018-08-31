import React from 'react';
import autobind from 'autobind-decorator';
import Header from '../components/header';

const TITLE = {
  en: 'Real-time chat',
  ru: 'Real-time чат'
};

const DESCRIPTION = {
  en: 'Enjoy it!',
  ru: 'Наслаждайтесь!'
};

@autobind
export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header
        title={TITLE[this.props.lang]}
        description={DESCRIPTION[this.props.lang]}
      />
    );
  }
}
