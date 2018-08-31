import React from 'react';
import autobind from 'autobind-decorator';
import { hot } from 'react-hot-loader';
import AppComponent from './app_component';
import LangChooserContainer from './language-chooser/lang-chooser';

@autobind
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayLangChooser: true,
      footerMayBeDisabled: false,
      language: 'en'
    };
  }

  confirmLogIn() {
    this.setState({
      footerMayBeDisabled: true
    });
  }

  handleLangChooserSubmit(language) {
    if (language === '')
      return;

    this.setState({ language });

    setTimeout(() => {
      this.setState({ displayLangChooser: false });
    }, 1000);
  }

  showLangChooser() {
    if (this.state.displayLangChooser)
      return (
        <LangChooserContainer
          handleSubmit={this.handleLangChooserSubmit}
        />
      );

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App updated.');
  }

  render() {
    return (
      <AppComponent
        confirmLogIn={this.confirmLogIn}
        footerMayBeDisabled={this.state.footerMayBeDisabled}
        langChooserElement={this.showLangChooser()}
        language={this.state.language}
      />
    );
  }
}

export default hot(module)(App);
