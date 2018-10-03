import React from 'react';
import autobind from 'autobind-decorator';
import User from '../components/user';

@autobind
export default class UserContainer extends React.Component {
  getSignElement() {
    if (this.props.sign === '')
      return null;
    else
      return <p className="user__sign">{this.props.sign}</p>;
  }

  render() {
    return (
      <User
        imgSrc={this.props.imgSrc}
        login={this.props.login}
        signElement={this.getSignElement()}
      />
    );
  }
}
