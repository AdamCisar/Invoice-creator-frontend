import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceItems } from '../service/InvoiceItemService';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

function InvoiceDetails() {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchInvoiceItems(id) {
      setIsLoading(true);
      try {
        const data = await getInvoiceItems(id);
        setInvoiceData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    }
    
    fetchInvoiceItems(id);
  }, [id]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-details-container">
      <div className="invoice-content">
        <div className="table-responsive invoice-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Názov</th>
                <th scope="col">Cena</th>
                <th scope="col">Počet</th>
              </tr>
            </thead>
            {isLoading ? 
              <div className='loading-spinner'>
              <LoadingSpinner /> 
              </div>
                      :
              <tbody>
                {invoiceData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td>{data.pivot.amount}</td>
                    <td className="invoice-actions">
                      <button type="button" className="btn btn-danger">Odstrániť</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
            <div/>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;