import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <footer className="footer">
      <nav className="footer__navigation">
        <ul className="unordered-list">
          {props.listData}
        </ul>
      </nav>
    </footer>
  );
};

Footer.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Footer;
