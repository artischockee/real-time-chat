import React from 'react';
import autobind from 'autobind-decorator';
import SidePanel from '../components/side-panel';

@autobind
export default class SidePanelContainer extends React.Component {
  getNoSearchMatchesElement() {
    if (
      this.props.searchValue !== ''
      && this.props.userList.length === 0
    )
      return (
        <div className="no-matches">
          <p className="no-matches__text">No matches found.</p>
        </div>
      );

    else
      return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('SidePanel updated.');
  }

  render() {
    return (
      <SidePanel
        handleSearchChange={this.props.handleSearchChange}
        noSearchMatchesElement={this.getNoSearchMatchesElement()}
        searchValue={this.props.searchValue}
        userList={this.props.userList}
      />
    );
  }
}
