import React from 'react';
import PropTypes from 'prop-types';

const UserList = props => {
  return (
    <ul className="user-list">
      {props.userList}
    </ul>
  );
};

UserList.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.object)
};

export default UserList;
