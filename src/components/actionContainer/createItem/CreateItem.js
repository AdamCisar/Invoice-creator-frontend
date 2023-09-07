import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Message from "../../message/Message";
import "./CreateItem.css";
import { saveItemToDatabase } from "../../service/ItemService";

const CreateItem = ({ showModal, setShowModal }) => {
  const [message, setMessage] = useState('');

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleSubmit = async () => {
    const itemData = {
        name: itemName,
        price: itemPrice
      };
    try {
        const item = await saveItemToDatabase(itemData);
        setMessage('Položka bola úspešne vytvorená.'); 
    } catch (error) {
        setMessage('Položku sa nepodarilo vytvoriť.');
    }
  }

  const handleItemPriceChange = (event) => {
    setItemPrice(event.target.value);
  };
  
  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

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
          <Modal.Title className="item-title">Vytvor položku</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-item">
            <input className="item-input"
                type="text"
                placeholder="Názov položky"
                value={itemName}
                onChange={handleItemNameChange}
            />

            <input className="item-input"
                type="text"
                placeholder="Cena položky"
                value={itemPrice}
                onChange={handleItemPriceChange}
            />

            <button onClick={handleSubmit} className="create-item-button-modal">
                <span className="button-label">Vytvoriť položku</span>
            </button>

        {message && (
          <Message
          message={message}
          onClose={() => {
            setMessage('');
          }}
          />
        )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateItem;
