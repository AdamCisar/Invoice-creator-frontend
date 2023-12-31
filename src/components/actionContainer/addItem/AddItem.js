import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Message from "../../message/Message";
import { getItems } from "../../service/ItemService";
import "./AddItem.css";
import NumberInput from "../../numberInput/NumberInput";

const AddItem = ({ showModal, setShowModal, onItemAdded }) => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(1);
  

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    }
    
    fetchItems();
  }, []);

  const handleFilter = (event) => {
    const query = event.target.value;
    setsearchTerm(query);
    const newFilter = items.filter((value) => {
      return value.name.toLowerCase().includes(query.toLowerCase());
    });

    if (query === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleAddItem = (selectedItem) => {
    
    const alreadyExists = onItemAdded(selectedItem, selectedNumber);
    setSelectedNumber(1);
    setMessage(alreadyExists);
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
          <Modal.Title className="item-title">Vyhľadaj položku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="search">
          <div className="searchInputs">
            <input
              className="custom-input"
              type="text"
              placeholder={"Zadaj názov položky"}
              value={searchTerm}
              onChange={handleFilter}
            />
          </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((item, key) => {
            return (
              <div className="result" key={item.id}>
                <a className="link" href={item.url}>{item.name} </a>
                <div className="button-sector">
                  <div className="input-number">
                    <NumberInput
                      value={selectedNumber}
                      onChange={(event) => setSelectedNumber(event.target.value)}
                    />
                  </div>
                  <button onClick={() => handleAddItem(item)}>Pridať</button> 
                </div>
              </div>
            );
          })}
        </div> 
      )}
    </div>
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

export default AddItem;
