import React from 'react';
import autobind from 'autobind-decorator';
import SidePanel from '../components/side-panel';

@autobind
export default class SidePanelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('SidePanel updated.');
  }

  render() {
    return (
      <SidePanel
        userList={this.props.userList}
      />
    );
  }
}
