import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { getInvoiceByName } from './service/InvoiceService'; 

function InvoiceDetails() {
  const { invoiceName } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    async function fetchInvoiceData() {
      try {
        // const data = await getInvoiceByName(invoiceName); 
        // setInvoiceData(data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    }

    fetchInvoiceData();
  }, [invoiceName]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-details">
      <h2>{invoiceData.name}</h2>
    </div>
  );
}

export default InvoiceDetails;