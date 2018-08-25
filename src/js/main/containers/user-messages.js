import React from 'react';
import autobind from 'autobind-decorator';
import UserMessages from '../components/user-messages';

@autobind
export default class UserMessagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getMessages() {
    return this.props.messages.map((message, index) => {
      return <li key={index} className="message">{message}</li>
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('UserMessages updated.');
  }

  render() {
    return (
      <UserMessages
        login={this.props.login}
        messages={this.getMessages()}
        sign={this.props.sign}
        time={this.props.time}
      />
    );
  }
}
