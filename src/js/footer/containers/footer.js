import React from 'react';
import autobind from 'autobind-decorator';
import Footer from '../components/footer';

class ListItem {
  constructor(label) {
    this.label = label;
  }
}

const listItemsArray = [
  new ListItem('About author'),
  new ListItem('Used stack'),
  new ListItem('Contact'),
  new ListItem('Rate')
];

const listItems = listItemsArray.map((item, index) => {
  return (
    <li className="unordered-list__list-item" key={index}>
      <a className="unordered-list__anchor" href="/" target="_blank">
        {item.label}
      </a>
    </li>
  )
});

@autobind
export default class FooterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Footer updated.');
  }

  render() {
    return (
      <Footer listData={listItems} />
    );
  }
}
