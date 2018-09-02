import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from './header/header';
import MainContainer from './main/containers/main';
import FooterContainer from './footer/footer';

const AppComponent = (props) => {
  return (
    <React.Fragment>
      {props.langChooserElement}

      <HeaderContainer
        lang={props.language}
        mayBeDisabled={props.sectionMayBeDisabled}
      />

      <MainContainer
        confirmLogIn={props.confirmLogIn}
        lang={props.language}
      />

      <FooterContainer
        mayBeDisabled={props.sectionMayBeDisabled}
        lang={props.language}
      />
    </React.Fragment>
  );
};

AppComponent.propTypes = {

};

export default AppComponent;
