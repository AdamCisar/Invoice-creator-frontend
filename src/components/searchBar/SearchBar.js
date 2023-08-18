import React, { useState } from 'react';
import './SearchBar.css';
import { searchForItems } from '../service/ScrapperService';
import Item from '../item/Item';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  const handleSearch = async () => {
    const data = await searchForItems(query);
    setItems(data);
  };

  return (
    <div className='content'>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Hľadaj produkt..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='Item'>
        {items.length > 0 ? 
        <Item items={items} /> :
         "Nič sa nenašlo..."
      }  
      </div>
    </div>
  );
};

export default SearchBar;
