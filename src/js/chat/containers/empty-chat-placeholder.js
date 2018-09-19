import React from 'react';
import autobind from 'autobind-decorator';
import EmptyChatPlaceholder from '../components/empty-chat-placeholder';
import { LANGUAGE } from '../../auxiliary/language';

const LANG_EN = LANGUAGE.EN.SHORT;
const LANG_RU = LANGUAGE.RU.SHORT;

const INSCRIPTION = {
  [LANG_EN]: 'Chat messages will be displayed here.',
  [LANG_RU]: 'Сообщения чата будут отображены здесь.'
};

@autobind
export default class EmptyChatPlaceholderContainer extends React.Component {
  render() {
    return (
      <EmptyChatPlaceholder
        inscription={INSCRIPTION[this.props.lang]}
      />
    );
  }
}
