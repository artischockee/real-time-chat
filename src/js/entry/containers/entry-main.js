import React from 'react';
import autobind from 'autobind-decorator';
import EntryMain from '../components/entry-main';

@autobind
export default class EntryMainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        isRequired: true,
        highlighted: false
      },
      sign: {
        isRequired: false,
        highlighted: false
      }
    };
  }

  handleChange(event) {
    let keyName = event.target.name;

    let key = this.state[keyName];

    if (key.highlighted && this.props.userData[keyName] !== '') {
      key.highlighted = false;

      this.setState({ [keyName]: key })
    }

    this.props.handleInputChange(event);
  }

  handleConnect(event) {
    event.preventDefault();

    if (this.props.userData.login !== '')
      this.props.handleConnect();
    else {
      let key = this.state.login;
      key.highlighted = true;

      this.setState({ login: key });
    }
  }

  render() {
    return (
      <EntryMain
        handleConnect={this.handleConnect}
        handleChange={this.handleChange}
        loginData={this.state.login}
        loginValue={this.props.userData.login}
        signData={this.state.sign}
        signValue={this.props.userData.sign}
      />
    );
  }
}
