import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <header className={props.classList}>
      <h1 className="header__title">{props.title}</h1>
      <h2 className="header__description">{props.description}</h2>
    </header>
  );
};

export default Header;
