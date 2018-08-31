import React from 'react';
import autobind from 'autobind-decorator';
import LoginBox from '../components/login-box';

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
}

@autobind
export default class LoginBoxContainer extends React.Component {
  constructor(props) {
    super(props);

    // The user's data (login and sign values) holds in Main

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
    let classList = 'login-box';

    if (this.state.fadeOutBeforeUnmount)
      classList += ` ${classList}_fade-out`;

    return classList;
  }

  handleConnect(event) {
    event.preventDefault();

    // TODO: Check for every state keys that are according to inputs.
    if (this.props.userData.login === '') {
      console.log('You have not filled in all the required input fields.');

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
      }, 1000);
    }
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

  render() {
    return (
      <LoginBox
        submit={SUBMIT[this.props.lang]}
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
        title={TITLE[this.props.lang]}
      />
    );
  }
}
