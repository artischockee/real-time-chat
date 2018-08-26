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

  getSignElement() {
    if (this.props.sign !== '')
      return <p className="sign">{this.props.sign}</p>;
    else
      return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('UserMessages updated.');
  }

  render() {
    return (
      <UserMessages
        image={this.props.image}
        login={this.props.login}
        messages={this.getMessages()}
        signElement={this.getSignElement()}
        time={this.props.time}
      />
    );
  }
}
