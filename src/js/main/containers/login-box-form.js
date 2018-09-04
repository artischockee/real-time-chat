import React from 'react';
import autobind from 'autobind-decorator';
import LoginBoxForm from '../components/login-box-form';

const TITLE = {
  en: 'Log in to continue',
  ru: 'Войдите, чтобы продолжить'
};

const FORM_LOGIN = {
  en: {
    label: 'Login',
    description: 'Could be your name, initials, nickname, etc.'
  },
  ru: {
    label: 'Логин',
    description: 'Это может быть ваше имя, инициалы, никнейм и т. д.'
  }
};

const FORM_SIGN = {
  en: {
    label: 'Sign',
    description: 'Could be your status, position, or simply your current mood - the choise is up to you.'
  },
  ru: {
    label: 'Подпись',
    description: 'Это может быть ваш статус, должность на работе или просто ваше текущее настроение - выбор за вами.'
  }
};

const SUBMIT = {
  en: 'Log in',
  ru: 'Войти'
};

@autobind
export default class LoginBoxFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeOutBeforeUnmount: false,
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

  getClassList() {
    let classList = 'login-box__form-wrapper';

    if (this.state.fadeOutBeforeUnmount)
      classList += ` ${classList}_fade-out`;

    return classList;
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

    if (this.props.userData.login === '') {
      let key = this.state.login;
      key.highlighted = true;

      this.setState({ login: key });
    }
    else {
      this.setState({
        fadeOutBeforeUnmount: true
      });
      setTimeout(() => {
        this.props.handleConnect();
      }, 300);
    }
  }

  render() {
    return (
      <LoginBoxForm
        classList={this.getClassList()}
        formLogin={FORM_LOGIN[this.props.lang]}
        formSign={FORM_SIGN[this.props.lang]}
        handleConnect={this.handleConnect}
        handleChange={this.handleChange}
        lang={this.props.lang}
        loginData={this.state.login}
        loginValue={this.props.userData.login}
        signData={this.state.sign}
        signValue={this.props.userData.sign}
        submit={SUBMIT[this.props.lang]}
        title={TITLE[this.props.lang]}
      />
    );
  }
}
