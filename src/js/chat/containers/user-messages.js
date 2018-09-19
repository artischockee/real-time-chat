import React from 'react';
import autobind from 'autobind-decorator';
import UserMessages from '../components/user-messages';

function arraysEqual(first, second) {
  return first.every((item, index) => item === second[index]);
}

@autobind
export default class UserMessagesContainer extends React.Component {
  getMessages() {
    return this.props.messages.map((message, index) => {
      return <li key={index} className="message">{message}</li>;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (arraysEqual(nextProps.messages, this.props.messages))
      return false;

    return true;
  }

  render() {
    return (
      <UserMessages
        image={this.props.image}
        login={this.props.login}
        messages={this.getMessages()}
        time={this.props.time}
      />
    );
  }
}
