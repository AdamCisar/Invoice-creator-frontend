import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faPlus } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const invoices = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey there!', unreadCount: 2 },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you?', unreadCount: 0 },
    { id: 3, name: 'Alex Johnson', lastMessage: 'Got any plans for the weekend?', unreadCount: 1 },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
      <FontAwesomeIcon icon={faFileInvoice} className="invoice-icon" />
          <span className='title'>Faktúry</span>
        <button className="create-invoice-button">
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          <span className="button-label">Vytvoriť faktúru</span>
        </button>
      </div>
      <div className="invoice-list">
        {invoices.map(item => (
          <div className="invoice" key={item.id}>
            <div className="invoice-avatar">
              {item.name[0]}
            </div>
            <div className="invoice-details">
              <div className="invoice-name">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
