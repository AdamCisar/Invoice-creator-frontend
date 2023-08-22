import React, { useState } from "react";
import "./ActionContainer.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddItem from "./addItem/AddItem";

const ActionContainer = () => {
    const [showModal, setShowModal] = useState(false);


  return (
    <div className="action-container text-center">
      <button  onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: "40px", color: "#3498db" }} />
      </button>
      <button className="btn btn-danger mx-2">
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {showModal && <AddItem 
        showModal={showModal} 
        setShowModal={setShowModal}
      />}
    </div>
  );
};

export default ActionContainer;
