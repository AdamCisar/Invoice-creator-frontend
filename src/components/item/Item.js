import React, { useState, useEffect } from 'react';
import './Item.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'; // Import Stack from Material-UI

const Item = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1350);
    setLoading(true);
    return () => clearTimeout(loadingTimeout);
  }, [items]);

  useEffect(() => {
    console.log("Items Length:", items);
    setTotalPages(Math.ceil(items.length / itemsPerPage));
  }, [items]);

  const startIndex = (currentPage - 1) * itemsPerPage; // Fix the calculation
  const endIndex = currentPage * itemsPerPage;
  const subset = items.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={`card-container ${loading ? 'loading' : ''}`}>
      {subset.map((item, index) => (
        <div className={`card ${!loading ? 'show' : ''}`} key={index}>
          <div className="card__img">
            <img src={`https://www.empiria.sk${item.imageUrl}`} alt="No image" />
          </div>
          <div className="card__content">
            <h4 className="card__title">
              <a href={item.url}>{item.name}</a>
            </h4>
            <div className="card__price">
              <span>{item.price} €</span>
            </div>
          </div>
          <div className="card__hover-content">
            <button className="card__button">Uložiť</button>
          </div>
        </div>
      ))}
      <Stack direction="row" spacing={2} justifyContent="center" className='pagination'>
        <Pagination
          count={totalPages}
          initialpage={currentPage}
          onChange={handlePageChange}
          size="large" 
        />
      </Stack>
    </div>
  );
};

export default Item;
