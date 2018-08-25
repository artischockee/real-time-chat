import React from 'react';
import autobind from 'autobind-decorator';
import User from '../components/user';

@autobind
export default class UserContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('User updated.');
  }

  render() {
    return (
      <User
        name={this.props.name}
        sign={this.props.sign}
        imgSrc={this.props.imgSrc}
      />
    );
  }
}
