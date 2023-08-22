import React from 'react';
import SideBar from './sideBar/SideBar';
import './Home.css';
import InvoiceDetails from './invoiceDetails/InvoiceDetails';
import ActionContainer from './actionContainer/ActionContainer';

const HomeInvoice = () => {

  return (
    <div className='Container'>
        <div className='SideBar'>
            <SideBar />
        </div>
        <div className="Content-Invoice">
          <ActionContainer />
            <div className='InvoiceDetails'>
                <InvoiceDetails />
            </div>
        </div>
    </div>
  );
};

export default HomeInvoice;
