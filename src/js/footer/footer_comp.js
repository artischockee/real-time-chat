import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <footer className={props.classList}>
      <nav className="footer__navigation">
        <ul className="unordered-list">
          {props.listData}
        </ul>
      </nav>
    </footer>
  );
};

Footer.propTypes = {
  classList: PropTypes.string.isRequired,
  listData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Footer;
