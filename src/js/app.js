import React from 'react';
import autobind from 'autobind-decorator';
import { hot } from 'react-hot-loader';
import HeaderContainer from './header/containers/header';
import MainContainer from './main/containers/main';
import FooterContainer from './footer/containers/footer';

@autobind
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      footerMayBeDisabled: false
    };
  }

  confirmLogIn() {
    this.setState({
      footerMayBeDisabled: true
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App updated.');
  }

  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        <MainContainer confirmLogIn={this.confirmLogIn} />
        <FooterContainer mayBeDisabled={this.state.footerMayBeDisabled} />
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
