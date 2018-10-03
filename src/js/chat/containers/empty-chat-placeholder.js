import React from 'react';
import autobind from 'autobind-decorator';
import EmptyChatPlaceholder from '../components/empty-chat-placeholder';

@autobind
export default class EmptyChatPlaceholderContainer extends React.Component {
  render() {
    return (
      <EmptyChatPlaceholder />
    );
  }
}
