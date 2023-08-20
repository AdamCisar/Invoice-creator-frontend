import React, { useState, useEffect } from 'react';
import './Item.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Item = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const isPhone = window.innerWidth <= 800;
  const itemsPerPage = isPhone ? 3 : 6;
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1350);
    setLoading(true);
    return () => clearTimeout(loadingTimeout);
  }, [items]);

  useEffect(() => {
    setTotalPages(Math.ceil(items.length / itemsPerPage));
  }, [items]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const subset = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const saveItem = async (item) => {
    try {
      setMessage('Produkt bol uložený do databázy.');
    } catch (error) {
      setMessage('Nepodarilo sa uložiť produkt do databázy.');
    }
  };

  return (
    <div className={`card-container ${loading ? 'loading' : ''}`}>
      {subset.map((item, index) => (
        <div className={`card ${!loading ? 'show' : ''}`} key={index}>
          <div className="card__img">
            <img src={`${item.imageUrl}`} alt=" " />
          </div>
          <div className="card__content">
            <h4 className="card-title">
              <a className="url" href={item.url}>
                {item.name}
              </a>
            </h4>
            <div className="card__price">
              <span>{item.price} €</span>
            </div>
          </div>
          <div className="card__hover-content">
            <Button onClick={() => saveItem(item)} className="card__button">
              Uložiť
            </Button>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
        />
      </div>
      {message && (
        <Alert variant="success" onClose={() => setMessage('')} dismissible>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Item;
