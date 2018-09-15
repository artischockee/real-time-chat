import React from 'react';
import autobind from 'autobind-decorator';
import EntryLang from '../components/entry-lang';
import { LANGUAGE } from '../../auxiliary/language';

@autobind
export default class EntryLangContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getListItems() {
    return Array.from(Object.values(LANGUAGE)).map((item, index) => {
      return (
        <li
          key={index}
          className="entry__list-item"
          onClick={() => this.props.changeLanguage(item.SHORT)}>
          {item.NAT}
        </li>
      );
    });
  }

  render() {
    return (
      <EntryLang
        listItems={this.getListItems()}
      />
    );
  }
}
