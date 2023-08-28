import React, {  useEffect, useState } from 'react';
import "./InvoiceDetails.css";
import { useLocation, useParams } from 'react-router-dom';
import { deleteInvoiceItem, getInvoiceItems, saveInvoiceItems } from '../service/InvoiceItemService';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ActionContainer from '../actionContainer/ActionContainer';
import { Message } from 'semantic-ui-react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getPdf } from '../service/PdfService';

function InvoiceDetails() {
  const location = useLocation();
  const invoice = location.state?.invoice;
  const { id } = useParams();

  const [invoiceData, setInvoiceData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [totalPrice, setTotalPrice] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const isPhone = window.innerWidth <= 800;
  const itemsPerPage = isPhone ? 5 : 10;

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
    setTotalPages(Math.ceil(invoiceData.length / itemsPerPage));
  }, [invoiceData, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage; 
  const endIndex = currentPage * itemsPerPage;
  const subset = invoiceData.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const totalPrice = invoiceData.reduce(
      (total, item) => total + (item.pivot.amount * parseFloat(item.price.replace(",", "."), 2)),
      0
    );

    const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));
    setTotalPrice(roundedTotalPrice);
  }, [invoiceData]);

  const handleAddItem = (selectedItem, selectedNumber) => {
    if (!isItemInInvoice(selectedItem.id)) {
      selectedItem.pivot = {
        amount: selectedNumber,
        invoice_id: Number(id),
        item_id: selectedItem.id
      };
      setInvoiceData([...invoiceData, selectedItem]);
    } else {
      return "Položka sa už nachádza vo faktúre."
    }
  };

  const handleSaveItems = async () => {
      await saveInvoiceItems(invoiceData);
  }

  const handleDelete = async (itemId) => {
    const data = {
      invoice_id: id,
      item_id: itemId
    }
    await deleteInvoiceItem(data);
    const updatedInvoiceData = invoiceData.filter(item => item.id !== itemId);
    setInvoiceData(updatedInvoiceData);
  }

  const isItemInInvoice = (itemId) => {
    return invoiceData.some(item => item.id === itemId);
  };

  const handleIncreaseAmount = (itemId) => {
    const updatedData = invoiceData.map((item) =>
      item.id === itemId ? { ...item, pivot: { ...item.pivot, amount: item.pivot.amount + 1 } } : item
    );
    setInvoiceData(updatedData);
  };

  const handleDecreaseAmount = (itemId) => {
    const updatedData = invoiceData.map((item) =>
      item.id === itemId && item.pivot.amount > 1 ? { ...item, pivot: { ...item.pivot, amount: item.pivot.amount - 1 } } : item
    );
    setInvoiceData(updatedData);
  };

  const handleDownload = async (id) => {
    await getPdf(id);
  }

  return (
    <div className="Content-Invoice">
      <ActionContainer
        onItemAdded={handleAddItem}
        onSaveItems={handleSaveItems}
        setIsLoading={setIsLoading}
        handleDownload={handleDownload}
      />
      <div className="invoice-details-container">
        <div className="invoice-content">
          <div className="invoice-data">
            Názov: {invoice.name}
          </div>
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
                  {subset.map((data, index) => (
                    <tr key={index}>
                      <td> <a className='link'  href={data.url}> {data.name} </a></td>
                      <td>{data.price}</td>
                      <td>
                        <i
                          type="button"
                          className="bi bi-minus"
                          onClick={() => handleDecreaseAmount(data.id)}
                        >
                          -
                        </i>
                        {data.pivot.amount}
                        <i
                          type="button"
                          className="bi bi-plus"
                          onClick={() => handleIncreaseAmount(data.id)}
                        >
                          +
                        </i>
                      </td>
                      <td className="invoice-actions">
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(data.id)}>
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
      {
      invoiceData.length > 10 ? 
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
      {message && (
          <Message
          message={message}
          onClose={() => {
            setMessage('');
          }}
          />
        )}
    </div>
  );
}

export default InvoiceDetails;