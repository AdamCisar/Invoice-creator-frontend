import React, { useState } from "react";
import "./ActionContainer.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFloppyDisk, faPenToSquare, faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddItem from "./addItem/AddItem";
import { useNavigate, useParams } from "react-router-dom";
import { deleteInvoice } from "../service/InvoiceService";
import Message from "../message/Message";
import { Tooltip } from "@mui/material";
import CreateItem from "./createItem/CreateItem";

const ActionContainer = ({ onItemAdded, onSaveItems, setIsLoading, handleDownload}) => {
    const navigate = useNavigate();
    const [showModalAddItem, setShowModalAddItem] = useState(false);
    const [showModalCreateItem, setShowModalCreateItem] = useState(false);
    const [message, setMessage] = useState('');
    const [actionType, setActionType] = useState(null);
    const { id } = useParams();

    const handleDelete = async (id) => {
      try {
          await deleteInvoice(id);
          setActionType('delete');
          setMessage('Faktúra bola úspešne vymazaná.'); 
      } catch (error) {
          setMessage('Nepodarilo sa vymazať faktúru.');
      }
    }

    const handleAddItem = (selectedItem, selectedNumber) => {
      return onItemAdded(selectedItem, selectedNumber);
    };

    const handleSave = async () => {
      try {
        setIsLoading(true);
        await onSaveItems();
        setActionType('save');
        setMessage('Faktúra bola uložená.'); 
        setIsLoading(false);
      } catch (error) {
        setMessage('Nepodarilo sa uložiť faktúru.');
      }
    };

  return (
    <div className="action-container text-center">
      <Tooltip title="Pridať položku">
        <button  onClick={() => setShowModalAddItem(true)}>
          <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: "40px", color: "#3498db" }} />
        </button>
      </Tooltip>
      <Tooltip title="Vytvoriť položku">
        <button onClick={() => setShowModalCreateItem(true)}>
          <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "30px", color: "#1e3050" }}/>
        </button>
      </Tooltip>
      <Tooltip title="Uložiť faktúru">
        <button className="btn btn-secondary mx-2" onClick={handleSave} >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </Tooltip>
      <Tooltip title="Odstrániť faktúru">
        <button className="btn btn-danger mx-2" onClick={() => handleDelete(id)} >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Tooltip>
      <Tooltip title="Stiahnuť pdf">
        <button className="btn btn-success mx-2" onClick={() => handleDownload(id)} >
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </Tooltip>
      {showModalAddItem && <AddItem 
        showModal={showModalAddItem} 
        setShowModal={setShowModalAddItem}
        onItemAdded={handleAddItem}
        />
      }
      {showModalCreateItem && <CreateItem 
        showModal={showModalCreateItem} 
        setShowModal={setShowModalCreateItem}
        onItemAdded={handleAddItem}
        />
      }
      {message && (
          <Message
          message={message}
          onClose={() => {
            if (actionType === 'delete') {
              navigate("/");
            } else {
              setMessage('');
            }
          }}
          />
        )}
    </div>
  );
};

export default ActionContainer;
