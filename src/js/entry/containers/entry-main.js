import React from 'react';
import autobind from 'autobind-decorator';
import EntryMain from '../components/entry-main';
import { LANGUAGE } from '../../auxiliary/language';

const LANG_EN = LANGUAGE.EN.SHORT;
const LANG_RU = LANGUAGE.RU.SHORT;

const TITLE = {
  [LANG_EN]: 'Log in to continue',
  [LANG_RU]: 'Войдите, чтобы продолжить'
};

const LOGIN = {
  [LANG_EN]: 'Login',
  [LANG_RU]: 'Логин'
};

const SIGN = {
  [LANG_EN]: 'Sign',
  [LANG_RU]: 'Подпись'
};

const SUBMIT = {
  [LANG_EN]: 'Log in',
  [LANG_RU]: 'Войти'
};

@autobind
export default class EntryMainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        isRequired: true,
        highlighted: false
      },
      sign: {
        isRequired: false,
        highlighted: false
      }
    };
  }

  handleChange(event) {
    let keyName = event.target.name;

    let key = this.state[keyName];

    if (key.highlighted && this.props.userData[keyName] !== '') {
      key.highlighted = false;

      this.setState({ [keyName]: key })
    }

    this.props.handleInputChange(event);
  }

  handleConnect(event) {
    event.preventDefault();

    if (this.props.userData.login !== '')
      this.props.handleConnect();
    else {
      let key = this.state.login;
      key.highlighted = true;

      this.setState({ login: key });
    }
  }

  render() {
    return (
      <EntryMain
        handleConnect={this.handleConnect}
        handleChange={this.handleChange}
        lang={this.props.lang}
        loginData={this.state.login}
        loginLabel={LOGIN[this.props.lang]}
        loginValue={this.props.userData.login}
        signData={this.state.sign}
        signLabel={SIGN[this.props.lang]}
        signValue={this.props.userData.sign}
        submit={SUBMIT[this.props.lang]}
        title={TITLE[this.props.lang]}
      />
    );
  }
}
