import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileInvoice, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateInvoice from '../createInvoice/CreateInvoice';
import { getInvoices } from '../service/InvoiceService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const invoicesPerPage = 7;

  useEffect(() => {
    setTotalPages(Math.ceil(invoices.length / invoicesPerPage));
  }, [invoices]);

  const startIndex = (currentPage - 1) * invoicesPerPage; 
  const endIndex = currentPage * invoicesPerPage;
  const subset = invoices.slice(startIndex, endIndex);

  const [isPhone, setIsPhone] = useState(window.innerWidth <= 935);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (isPhone) {
      if (sidebarOpen) {
        const handleOutsideClick = (event) => {
          const sidebar = document.querySelector('.sidebar');
          if (sidebar && !sidebar.contains(event.target)) {
            setSidebarOpen(false);
          }
        };
  
        document.addEventListener('click', handleOutsideClick);
  
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }
    }
  }, [sidebarOpen, isPhone]);
  

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="bars-icon" />
      </button>
      { sidebarOpen ? 
      <div>
        <div className="sidebar-header">
        <Link to="/" className="custom-link invoice-link">
              <FontAwesomeIcon icon={faFileInvoice} className="invoice-icon" />
                  <span className='title'>Faktúry</span>
        </Link>
            <button onClick={() => setShowModal(true)} className="create-invoice-button">
              <FontAwesomeIcon icon={faPlus} className="plus-icon" />
              <span className="button-label">Vytvoriť faktúru</span>
            </button>
          </div>  
          <div className="invoice-list">
            {invoices && subset.map(item => (
              <Link to={`/faktura/${item.id}`} state={{invoice: item}} onClick={toggleSidebar}
                key={item.id} 
                className="custom-link invoice-button">
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
              </Link>
            ))}
          </div>
      {
      invoices.length > 6 ? 
      <Stack direction="row" spacing={2} justifyContent="center" className='pagination'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large" 
        />
      </Stack> : 
      null
      }
      </div> 
        : null
      }
      {showModal && <CreateInvoice 
        onInvoiceCreated={handleInvoiceCreated}
        showModal={showModal} 
        setShowModal={setShowModal} />
      }
    </div>
  );
};

export default SideBar;
