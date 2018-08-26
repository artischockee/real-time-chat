import React from 'react';
import autobind from 'autobind-decorator';
import UsersOnline from '../components/users-online';
import UserContainer from './user';

@autobind
export default class UsersOnlineContainer extends React.Component {
  constructor(props) {
    super(props);

    this.className = 'users-online';
  }

  getClassList() {
    let classList = this.className;

    if (this.props.hidden)
      classList += ` ${classList}_hidden`;
    else
      classList += ` ${classList}_visible`;

    return classList;
  }

  getUsersList() {
    return this.props.userList.map((item, index) => {
      return (
        <UserContainer
          name={item.login}
          sign={item.sign}
          imgSrc={item.image}
          key={index}
        />
      )
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.hidden !== this.props.hidden
    || nextProps.userList !== this.props.userList)
      return true;

    return false;
  }

  render() {
    return (
      <UsersOnline
        classList={this.getClassList()}
        usersList={this.getUsersList()}
        currentlyOnline={this.props.userList.length}
      />
    );
  }
}
