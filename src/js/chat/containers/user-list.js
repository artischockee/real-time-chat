import React from 'react';
import autobind from 'autobind-decorator';
import UserList from '../components/user-list';
import UserContainer from './user';

@autobind
export default class UserListContainer extends React.Component {
  getUserList() {
    if (this.props.userList.length === 0)
      return null;

    return this.props.userList.map((user, index) => {
      return (
        <UserContainer
          imgSrc={user.image}
          key={index}
          login={user.login}
          sign={user.sign}
        />
      );
    });
  }

  render() {
    return (
      <UserList
        userList={this.getUserList()}
      />
    );
  }
}
