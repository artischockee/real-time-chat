import React from 'react';
import autobind from 'autobind-decorator';
import Chat from '../components/chat';

@autobind
export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Chat updated.');
  }

  render() {
    return (
      <Chat />
    );
  }
}
