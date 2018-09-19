import React from 'react';
import autobind from 'autobind-decorator';
import ChatBox from '../components/chat-box';
import EmptyChatPlaceholderContainer from './empty-chat-placeholder';
import UserMessagesContainer from './user-messages';

function alignTimeValue(timeValue) {
  if (timeValue.length === 1)
    return `0${timeValue}`;
  else return timeValue;
}

function assemblyMessageDate(rawDate) {
  let date = new Date(rawDate);

  let hours = alignTimeValue(date.getHours().toString());
  let minutes = alignTimeValue(date.getMinutes().toString());

  return `${hours}:${minutes}`;
}

@autobind
export default class ChatBoxContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getEmptyChatPlaceholder() {
    if (this.props.messages.length !== 0)
      return null;

    return (
      <EmptyChatPlaceholderContainer
        lang={this.props.lang}
      />
    );
  }

  getMessages() {
    if (this.props.messages.length === 0)
      return null;

    let msgArray = this.props.messages;

    let combinedUserMessages = [];
    let combinedIndex = 0;

    msgArray.forEach((item, index, msgArray) => {
      if (index == 0 || item.id !== msgArray[index - 1].id) {
        combinedUserMessages.push({
          date: item.date,
          id: item.id,
          image: item.image,
          login: item.login,
          text: item.text instanceof Array ? [...item.text] : [item.text]
        });

        combinedIndex = combinedUserMessages.length - 1;
      }
      else {
        let sameUserDataMsg = combinedUserMessages[combinedIndex].text;
        combinedUserMessages[combinedIndex].text = [...sameUserDataMsg, item.text];
      }
    });

    return combinedUserMessages.map((item, index) => {
      let time = assemblyMessageDate(item.date);
      return (
        <UserMessagesContainer
          image={item.image}
          key={index}
          login={item.login}
          messages={item.text}
          time={time}
        />
      )
    });
  }

  render() {
    return (
      <ChatBox
        emptyChatPlaceholder={this.getEmptyChatPlaceholder()}
        messages={this.getMessages()}
      />
    );
  }
}
