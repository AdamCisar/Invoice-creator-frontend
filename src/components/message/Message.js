import React from 'react';
import './Message.css';

const Message = ({ message, onClose }) => {
  return (
    <div className="message-overlay">
      <div className="message-popup">
        <span className="message-content">{message}</span>
        <button onClick={onClose} className="message-close-button">
          Zatvoriť
        </button>
      </div>
    </div>
  );
};

export default Message;
