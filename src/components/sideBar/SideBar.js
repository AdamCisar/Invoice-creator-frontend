import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateInvoice from '../createInvoice/CreateInvoice';
import { getInvoices } from '../service/InvoiceService';

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    }
    
    fetchInvoices();
  }, []);

  const handleInvoiceCreated = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
      <FontAwesomeIcon icon={faFileInvoice} className="invoice-icon" />
          <span className='title'>Faktúry</span>
        <button onClick={() => setShowModal(true)} className="create-invoice-button">
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          <span className="button-label">Vytvoriť faktúru</span>
        </button>
      </div> 
      <div className="invoice-list">
        {invoices && invoices.map(item => (
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
      {showModal && <CreateInvoice 
        onInvoiceCreated={handleInvoiceCreated}
        showModal={showModal} 
        setShowModal={setShowModal} />}
    </div>
  );
};

export default SideBar;
