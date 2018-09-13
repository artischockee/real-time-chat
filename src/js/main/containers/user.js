import React from 'react';
import autobind from 'autobind-decorator';
import User from '../components/user';

@autobind
export default class UserContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getSignElement() {
    if (this.props.sign !== '')
      return <p className="user__sign">{this.props.sign}</p>;
    else
      return null;
  }

  render() {
    return (
      <User
        name={this.props.name}
        signElement={this.getSignElement()}
        imgSrc={this.props.imgSrc}
      />
    );
  }
}
