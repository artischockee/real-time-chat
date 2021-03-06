import React from 'react';
import autobind from 'autobind-decorator';
import SidePanel from '../components/side-panel';

@autobind
export default class SidePanelContainer extends React.Component {
  getClassList() {
    let classList = 'chat__side-panel';

    if (this.props.isMobileVersion) {
      if (this.props.displaySidePanelOnMobile)
        classList += ` ${classList}_visible`;
      else
        classList += ` ${classList}_hidden`;
    }

    return classList;
  }

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

  render() {
    return (
      <SidePanel
        classList={this.getClassList()}
        handleSearchChange={this.props.handleSearchChange}
        noSearchMatchesElement={this.getNoSearchMatchesElement()}
        searchValue={this.props.searchValue}
        userList={this.props.userList}
      />
    );
  }
}
