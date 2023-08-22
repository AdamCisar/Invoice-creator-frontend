import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Message from "../../message/Message";

const AddItem = ({ showModal, setShowModal, onInvoiceCreated }) => {
  const [message, setMessage] = useState('');


  return (
    <div className="item">
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
          <Modal.Title className="item-title">Vyhľadaj položku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

export default AddItem;
