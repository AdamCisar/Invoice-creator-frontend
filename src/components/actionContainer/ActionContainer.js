import React, { useState } from "react";
import "./ActionContainer.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddItem from "./addItem/AddItem";
import { useParams } from "react-router-dom";
import { deleteInvoice } from "../service/InvoiceService";
import Message from "../message/Message";

const ActionContainer = ({ onItemAdded, onSaveItems, setIsLoading}) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const { id } = useParams();

    const handleDelete = async (id) => {
      try {
          await deleteInvoice(id);
          setMessage('Faktúra bola úspešne vymazaná.'); 
      } catch (error) {
          setMessage('Nepodarilo sa vymazať faktúru.');
      }
    }

    const handleAddItem = (selectedItem, selectedNumber) => {
      onItemAdded(selectedItem, selectedNumber);
    };

    const handleSave = async () => {
      try {
        setIsLoading(true);
        await onSaveItems();
        setMessage('Faktúra bola uložená.'); 
        setIsLoading(false);
      } catch (error) {
        setMessage('Nepodarilo sa uložiť faktúru.');
      }
    };

  return (
    <div className="action-container text-center">
      <button  onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: "40px", color: "#3498db" }} />
      </button>
      <button className="btn btn-danger mx-2">
        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(id)} />
      </button>
      <button className="btn btn-secondary mx-2">
        <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSave} />
      </button>
      {showModal && <AddItem 
        showModal={showModal} 
        setShowModal={setShowModal}
        onItemAdded={handleAddItem}
        />
      }
      {message && (
          <Message
          message={message}
          onClose={() => {
            setMessage('');
            setShowModal(false);
          }}
          />
        )}
    </div>
  );
};

export default ActionContainer;
