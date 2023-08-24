import React, { useEffect, useState } from 'react';
import "./InvoiceDetails.css";
import { useParams } from 'react-router-dom';
import { getInvoiceItems, saveInvoiceItems } from '../service/InvoiceItemService';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ActionContainer from '../actionContainer/ActionContainer';

function InvoiceDetails() {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    const totalPrice = invoiceData.reduce(
      (total, item) => total + (item.pivot.amount * parseFloat(item.price.replace(",", "."), 10)),
      0
    );

    const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));
    setTotalPrice(roundedTotalPrice);
  }, [invoiceData]);

  const handleAddItem = (selectedItem, selectedNumber) => {
    selectedItem.pivot = {
      amount: selectedNumber,
      invoice_id: Number(id),
      item_id: selectedItem.id
    };
    setInvoiceData([...invoiceData, selectedItem]);
  };

  const handleSaveItems = () => {
    saveInvoiceItems(invoiceData);
  };

  return (
    <div className="Content-Invoice">
      <ActionContainer
        onItemAdded={handleAddItem}
        onSaveItems={handleSaveItems}
      />
      <div className="invoice-details-container">
        <div className="invoice-content">
          <div className="total-price">Celková suma: {totalPrice} €</div>
          <div className="table-responsive invoice-table">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Názov</th>
                    <th scope="col">Cena</th>
                    <th scope="col">Počet</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td>{data.pivot.amount}</td>
                      <td className="invoice-actions">
                        <button type="button" className="btn btn-danger">
                          Odstrániť
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;