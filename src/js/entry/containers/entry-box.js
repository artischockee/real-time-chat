import React from 'react';
import autobind from 'autobind-decorator';
import EntryBox from '../components/entry-box';

@autobind
export default class EntryBoxContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EntryBox
        handleConnect={this.props.handleConnect}
        handleLogInInputChange={this.props.handleLogInInputChange}
        lang={this.props.lang}
        userData={this.props.userData}
      />
    );
  }
}
