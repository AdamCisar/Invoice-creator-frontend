import React from 'react';
import './Invoice.css';
import SideBar from '../sideBar/SideBar';
import InvoiceDetails from '../invoiceDetails/InvoiceDetails';

const Invoice = () => {
  return (
    <div className='Container'>
      <div className='SideBar'>
        <SideBar />
      </div>
      <div className='InvoiceDetails'>
        <InvoiceDetails />
      </div>
    </div>
  );
};

export default Invoice;
