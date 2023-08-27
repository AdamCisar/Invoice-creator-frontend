import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./CreateInvoice.css";
import { createInvoice } from "../service/InvoiceService";
import Message from "../message/Message";

const CreateInvoice = ({ showModal, setShowModal, onInvoiceCreated }) => {
  const [invoiceName, setInvoiceName] = useState("");
  const [message, setMessage] = useState('');

  const handleInvoiceNameChange = (event) => {
    setInvoiceName(event.target.value);
  };

  const handleSubmit = async () => {
    const invoiceData = {
        name: invoiceName
      };
    try {
        const invoice = await createInvoice(invoiceData);
        setMessage('Faktúra bola úspešne vytvorená.'); 
        onInvoiceCreated(invoice);
        setInvoiceName("");
    } catch (error) {
        setMessage('Nepodarilo sa vytvoriť faktúru.');
    }
  }

  return (
    <div className="invoice">
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <Modal.Header closeButton>
          <Modal.Title className="invoice-title">Vytvor faktúru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="invoice-input"
            type="text"
            placeholder="Názov faktúry"
            value={invoiceName}
            onChange={handleInvoiceNameChange}
          />
           <button onClick={handleSubmit} className="create-invoice-button-modal">
          <span className="button-label">Vytvoriť faktúru</span>
        </button>
        {message && (
          <Message
          message={message}
          onClose={() => {
            setMessage('');
            setShowModal(false);
          }}
          />
        )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateInvoice;
