import React from 'react';
import autobind from 'autobind-decorator';
import Entry from '../components/entry';

@autobind
export default class EntryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flipOut: false
    };
  }

  getClassList() {
    let classList = 'entry';

    if (this.state.flipOut)
      classList += ` ${classList}_flip-out`;

    return classList;
  }

  handleConnect() {
    this.setState({
      flipOut: true
    });

    setTimeout(this.props.handleConnect, 500);
  }

  render() {
    return (
      <Entry
        classList={this.getClassList()}
        handleConnect={this.handleConnect}
        handleLangChange={this.props.handleLangChange}
        handleLogInInputChange={this.props.handleLogInInputChange}
        lang={this.props.lang}
        userData={this.props.userData}
      />
    );
  }
}
