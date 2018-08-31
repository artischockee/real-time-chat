import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from './header/containers/header';
import MainContainer from './main/containers/main';
import FooterContainer from './footer/containers/footer';

const AppComponent = (props) => {
  return (
    <React.Fragment>
      {props.langChooserElement}

      <HeaderContainer lang={props.language} />

      <MainContainer
        confirmLogIn={props.confirmLogIn}
        lang={props.language}
      />

      <FooterContainer
        mayBeDisabled={props.footerMayBeDisabled}
        lang={props.language}
      />
    </React.Fragment>
  );
};

AppComponent.propTypes = {

};

export default AppComponent;
