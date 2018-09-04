import React from 'react';
import autobind from 'autobind-decorator';
import LoginBox from '../components/login-box';
import LoginBoxFormContainer from './login-box-form';
import LoginBoxLoadingContainer from './login-box-loading';

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

    // let interval = setInterval(() => {
      // if (this.props.connectionState === 1) {
        this.setState({
          fadeOutBeforeUnmount: true
        });

        setTimeout(() => {
          this.props.handleConnect();
        }, 850);

        // clearInterval(interval);
      // }
    // }, 100);
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
