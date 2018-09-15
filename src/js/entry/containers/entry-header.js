import React from 'react';
import autobind from 'autobind-decorator';
import EntryHeader from '../components/entry-header';
import { LANGUAGE } from '../../auxiliary/language';

const LANG_EN = LANGUAGE.EN.SHORT;
const LANG_RU = LANGUAGE.RU.SHORT;

const LIST_ITEMS_DATA = [
  {
    [LANG_EN]: 'About',
    [LANG_RU]: 'О проекте'
  },
  {
    [LANG_EN]: 'Github',
    [LANG_RU]: 'Github'
  },
  {
    [LANG_EN]: 'Contact',
    [LANG_RU]: 'Связаться'
  }
];

@autobind
export default class EntryHeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getListItems() {
    return LIST_ITEMS_DATA.map((item, index) => {
      return (
        <li key={index} className="entry-header__list-item">{item[this.props.lang]}</li>
      );
    });
  }

  render() {
    return (
      <EntryHeader
        listItems={this.getListItems()}
      />
    );
  }
}
