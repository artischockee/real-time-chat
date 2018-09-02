import React from 'react';
import autobind from 'autobind-decorator';
import Footer from './footer_comp';

class ListItem {
  constructor(label, href = '/') {
    this.label = label;
    this.href = href;
  }
}

const LIST_ITEMS = [
  new ListItem({ en: 'About author', ru: 'Об авторе' }),
  new ListItem('Github', 'https://github.com/artyeug/real-time-chat'),
  new ListItem({ en: 'Contact', ru: 'Связаться' })
];

@autobind
export default class FooterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassList() {
    let className = 'footer';

    if (this.props.mayBeDisabled)
      className += ' footer_may-be-disabled';

    return className;
  }

  render() {
    let listItems = LIST_ITEMS.map((item, index) => {
      let label = typeof item.label === 'object'
        ? item.label[this.props.lang]
        : item.label;

      return (
        <li className="unordered-list__list-item" key={index}>
          <a className="unordered-list__anchor" href={item.href} target="_blank">
            {label}
          </a>
        </li>
      )
    });

    return (
      <Footer classList={this.getClassList()} listData={listItems} />
    );
  }
}
