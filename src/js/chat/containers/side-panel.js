import React from 'react';
import autobind from 'autobind-decorator';
import SidePanel from '../components/side-panel';

@autobind
export default class SidePanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    }
  }

  getFilteredUserList() {
    if (this.state.searchValue === '')
      return this.props.userList;

    return this.props.userList.filter(user => {
      let login = user.login.toLowerCase();
      let sign = user.sign.toLowerCase();
      let searchValue = this.state.searchValue.toLowerCase();

      return login.includes(searchValue) || sign.includes(searchValue);
    });
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('SidePanel updated.');
  }

  render() {
    return (
      <SidePanel
        handleSearchChange={this.handleSearchChange}
        searchValue={this.state.searchValue}
        userList={this.getFilteredUserList()}
      />
    );
  }
}
