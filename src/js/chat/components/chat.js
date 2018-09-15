import React from 'react';
import PropTypes from 'prop-types';

const Chat = (props) => {
  return (
    <div className="chat">

      <section className="chat__side-panel">

        <div className="side-panel__search-container">
          <input className="side-panel__search-field" type="text" placeholder="Search" size="20" />
        </div>
        <div className="side-panel__online-container">
          <ul className="user-list">
            <li className="user-list__user">
              <div className="user__image-wrapper">
                <img className="user__image" src="images/avatars/1.jpg" alt="avatar" />
              </div>
              <div className="user__info-wrapper">
                <p className="user__name">John Doe</p>
                <p className="user__sign">I am the God</p>
              </div>
            </li>
            <li className="user-list__user">
              <div className="user__image-wrapper">
                <img className="user__image" src="images/avatars/2.jpg" alt="avatar" />
              </div>
              <div className="user__info-wrapper">
                <p className="user__name">Dohn Joe</p>
                <p className="user__sign">The supermega long true-story shitty sign made by the idiot</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="side-panel__controls-container">
          <h5 style={{ margin: '0' }}>bottom</h5>
        </div>
      </section>

      <div>
        <div>
          <p>Chat</p>
          <div>
            <button>notif</button>
            <button>delete msgs</button>
          </div>
        </div>
        <div>
          <p>msg1</p>
          <p>msg2</p>
          <p>msg3</p>
          <p>msg...</p>
        </div>
        <div>
          <h5>attachment</h5>
          <input type="text" value="your msg" />
          <h5>smiles</h5>
        </div>
      </div>

    </div>
  );
};

Chat.propTypes = {

};

export default Chat;
