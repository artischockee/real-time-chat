import React from 'react';
import autobind from 'autobind-decorator';
import LoginBoxLoading from '../components/login-box-loading';

const INSCRIPTION = {
  en: 'Please wait..',
  ru: 'Пожалуйста, подождите..'
};

@autobind
export default class LoginBoxLoadingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeInAfterMount: false
    };
  }

  getClassList() {
    let classList = 'login-box__loading-wrapper';

    if (this.state.fadeInAfterMount)
      classList += ` ${classList}_fade-in`;

    return classList;
  }

  componentDidMount() {
    // Ensure that fade-in effect will occur smoothly by using setTimeout
    setTimeout(() => {
      this.setState({
        fadeInAfterMount: true
      });
    }, 100);
  }

  render() {
    return (
      <LoginBoxLoading
        classList={this.getClassList()}
        inscription={INSCRIPTION[this.props.lang]}
      />
    );
  }
}
