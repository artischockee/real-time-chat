import React from 'react';
import autobind from 'autobind-decorator';
import Header from '../components/header';

@autobind
export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Header updated.');
  }

  render() {
    return (
      <Header />
    );
  }
}
