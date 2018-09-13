import React from 'react';
import autobind from 'autobind-decorator';
import LoginBox from '../components/login-box';
import LoginBoxFormContainer from './login-box-form';
import LoginBoxLoadingContainer from './login-box-loading';
import { CALLBACK_STATE } from '../../auxiliary/states';

const FRAGMENT = {
  FORM: 'FORM',
  LOADING: 'LOADING'
};

@autobind
export default class LoginBoxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeOutBeforeUnmount: false,
      currentFragment: FRAGMENT.FORM
    };
  }

  getClassList() {
    let classList = 'login-box';

    if (this.state.fadeOutBeforeUnmount)
      classList += ` ${classList}_fade-out`;

    return classList;
  }

  getCurrentFragment() {
    switch (this.state.currentFragment) {
      case FRAGMENT.FORM:
        return (
          <LoginBoxFormContainer
            handleConnect={this.handleConnect}
            handleInputChange={this.props.handleInputChange}
            lang={this.props.lang}
            userData={this.props.userData}
          />
        );
      case FRAGMENT.LOADING:
        return (
          <LoginBoxLoadingContainer
            lang={this.props.lang}
          />
        );
    }
  }

  handleConnect() {
    this.setState({
      currentFragment: FRAGMENT.LOADING
    });

    this.props.handleConnect();

    let intervalLimiter = 600;
    
    setTimeout(() => {
      let interval = setInterval(() => {
        if (this.props.connectionState === 1) {
          this.setState({
            fadeOutBeforeUnmount: true
          });

          setTimeout(() => this.props.sendFadeOutCallback(CALLBACK_STATE.SUCCESS), 850);
          clearInterval(interval);
        }
        if (--intervalLimiter === 0) {
          console.error('WS connection timeout.');
          this.props.sendFadeOutCallback(CALLBACK_STATE.FAILURE);
          clearInterval(interval);
        }
      }, 100);
    }, 1000);
  }

  render() {
    return (
      <LoginBox
        classList={this.getClassList()}
        fragment={this.getCurrentFragment()}
      />
    );
  }
}
