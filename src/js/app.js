import React from 'react';
import autobind from 'autobind-decorator';
import { hot } from 'react-hot-loader';
import HeaderContainer from './header/containers/header';
import MainContainer from './main/containers/main';
import FooterContainer from './footer/containers/footer';

@autobind
class App extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('App updated.');
  }

  render() {
    return (
      <div className="root">
        <HeaderContainer />
        <MainContainer />
        <FooterContainer />
      </div>
    );
  }
}

export default hot(module)(App);
