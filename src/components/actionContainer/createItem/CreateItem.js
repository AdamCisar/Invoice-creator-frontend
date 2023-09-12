import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Message from "../../message/Message";
import "./CreateItem.css";
import { saveItemToDatabase } from "../../service/ItemService";
import CustomCheckbox from "./customCheckBox/CustomCheckBox";
import { useParams } from "react-router-dom";
import { saveCustomItem } from "../../service/CustomItemService";

const CreateItem = ({ showModal, setShowModal }) => {
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const { id } = useParams();

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const handleSubmit = async () => {
    if(!isChecked)
    {
      const itemData = {
          name: itemName,
          price: itemPrice
        };
      try {
          await saveItemToDatabase(itemData);
          setMessage('Položka bola úspešne vytvorená.'); 
      } catch (error) {
          setMessage('Položku sa nepodarilo vytvoriť.');
      }
    }else{
      const itemData = {
        name: itemName,
        price: itemPrice,
        amount: itemAmount,
        invoice_id: id
      };
    try {
        await saveCustomItem(itemData);
        setMessage('Položka bola úspešne vytvorená.'); 
    } catch (error) {
        setMessage('Položku sa nepodarilo vytvoriť.');
    }
    }
  }

  const handleItemPriceChange = (event) => {
    setItemPrice(event.target.value);
  };
  
  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemAmountChange = (event) => {
    setItemAmount(event.target.value);
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
            { 
            isChecked ?
            <input className="item-input"
                type="text"
                placeholder="Počet"
                value={itemAmount}
                onChange={handleItemAmountChange}
            />
            :
            null
            }
            <button onClick={handleSubmit} className="create-item-button-modal">
                <span className="button-label">Vytvoriť položku</span>
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
        <Modal.Footer>
          <CustomCheckbox 
          label="Vytvoriť len pre túto faktúru" 
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateItem;
