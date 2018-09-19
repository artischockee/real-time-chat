import React from 'react';
import PropTypes from 'prop-types';
import ChatBoxContainer from '../containers/chatbox';
import { BTN_NAMES } from '../../auxiliary/chat-button-names';

const MainPanel = (props) => {
  return (
    <section className="chat__main-panel">

      <div className="main-panel__controls-container">
        <p className="main-panel__inscription">Real-time chat</p>
        <div className="main-panel__chat-controls">
          <button name={BTN_NAMES.NOTIFICATIONS} className="chat__control-button" onClick={props.handleControlClick}>
            <svg className="control-button__svg" width="510" height="510" viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g>
                <path d="m255 510c28.05 0 51-22.95 51-51h-102c0 28.05 22.95 51 51 51zm165.75-153v-140.25c0-79.05-53.55-142.8-127.5-160.65v-17.85c0-20.4-17.85-38.25-38.25-38.25s-38.25 17.85-38.25 38.25v17.85c-73.95 17.85-127.5 81.6-127.5 160.65v140.25l-51 51v25.5h433.5v-25.5l-51-51z" />
              </g>
            </svg>
          </button>
          <button name={BTN_NAMES.DEL_MESSAGES} className="chat__control-button" onClick={props.handleControlClick}>
            <svg className="control-button__svg" width="459" height="459" viewBox="0 0 459 459" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g>
                <path d="M76.5,408c0,28.05,22.95,51,51,51h204c28.05,0,51-22.95,51-51V102h-306V408z M408,25.5h-89.25L293.25,0h-127.5l-25.5,25.5    H51v51h357V25.5z"/>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <ChatBoxContainer
        lang={props.lang}
        messages={props.messages}
      />

      <div className="main-panel__input-container">
        <button name={BTN_NAMES.ATTACHMENT} className="chat__control-button" onClick={props.handleControlClick}>
          <svg className="control-button__svg" width="510" height="510" viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g transform="rotate(-45 272.68 240.01)">
            <g>
              <path d="m140.25 395.25c-76.5 0-140.25-63.75-140.25-140.25s63.75-140.25 140.25-140.25h267.75c56.1 0 102 45.9 102 102s-45.9 102-102 102h-216.75c-35.7 0-63.75-28.05-63.75-63.75s28.05-63.75 63.75-63.75h191.25v38.25h-191.25c-15.3 0-25.5 10.2-25.5 25.5s10.2 25.5 25.5 25.5h216.75c35.7 0 63.75-28.05 63.75-63.75s-28.05-63.75-63.75-63.75h-267.75c-56.1 0-102 45.9-102 102s45.9 102 102 102h242.25v38.25z"/>
            </g>
          </g>
        </svg>
        </button>

        <input type="text" value="your msg" />
        <button name={BTN_NAMES.EMOJI} className="chat__control-button" onClick={props.handleControlClick}>
          <svg className="control-button__svg" width="510" height="510" viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g>
              <path d="m344.25 229.5c20.4 0 38.25-17.85 38.25-38.25s-17.85-38.25-38.25-38.25-38.25 17.85-38.25 38.25 17.85 38.25 38.25 38.25zm-178.5 0c20.4 0 38.25-17.85 38.25-38.25s-17.85-38.25-38.25-38.25-38.25 17.85-38.25 38.25 17.85 38.25 38.25 38.25zm89.25 178.5c66.3 0 122.4-43.35 145.35-102h-290.7c22.95 58.65 79.05 102 145.35 102zm0-408c-140.25 0-255 114.75-255 255s114.75 255 255 255 255-114.75 255-255-114.75-255-255-255zm0 459c-112.2 0-204-91.8-204-204s91.8-204 204-204 204 91.8 204 204-91.8 204-204 204z"/>
            </g>
          </svg>
        </button>
      </div>
    </section>
  );
};

MainPanel.propTypes = {

};

export default MainPanel;
