import React, { useState, useEffect } from 'react';
import './Item.css';

const Item = ({ items }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1350);
    setLoading(true);
    return () => clearTimeout(loadingTimeout);
  }, [items]);

  return (
    <div className={`card-container ${loading ? 'loading' : ''}`}>
    {items.map((item, index) => (
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
  </div>
  );
};

export default Item;
