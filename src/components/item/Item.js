import React, { useState, useEffect } from 'react';
import './Item.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { saveItemToDatabase } from '../service/ItemService';
import Message from '../message/Message';

const Item = ({ items }) => {
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const isPhone = window.innerWidth <= 800;
  const itemsPerPage = isPhone ? 4 : 4;

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
  }, [items, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage; 
  const endIndex = currentPage * itemsPerPage;
  const subset = items.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const saveItem = async (item) => {
    try {
      await saveItemToDatabase(item);
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
            <img src={`${item.imageUrl}`} alt=" "/>
          </div>
          <div className="card__content">
            <h4 className="card__title">
              <a className='url' href={item.url}>{item.name.length >= 65 ? `${item.name.slice(0, 65)} ...` : item.name}</a>
            </h4>
            <div className="card__price">
              <span>{item.price} €</span>
            </div>
          </div>
          <div className="card__hover-content">
            <button onClick={() => saveItem(item)}  className="card__button">Uložiť</button>
          </div>
        </div>
      ))}
      <Stack direction="row" spacing={2} justifyContent="center" className='pagination'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large" 
        />
      </Stack>
      {message && (
        <Message
          message={message}
          onClose={() => setMessage('')}
        />
      )}
    </div>
  );
};

export default Item;
