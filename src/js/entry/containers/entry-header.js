import React from 'react';
import autobind from 'autobind-decorator';
import EntryHeader from '../components/entry-header';

const LIST_ITEMS_DATA = [
  'About',
  'Github',
  'Contact'
];

@autobind
export default class EntryHeaderContainer extends React.Component {
  getListItems() {
    return LIST_ITEMS_DATA.map((item, index) => {
      return (
        <li key={index} className="entry-header__list-item">{item}</li>
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
