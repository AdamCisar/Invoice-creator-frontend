import React, { useState } from 'react';
import './SearchBar.css';
import { searchForItems } from '../service/ScrapperService';
import Item from '../item/Item';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItems, setShowItems] = useState(false);
 
  const handleSearch = async () => {
    if(query === ""){
      return;
    }
    setShowItems(true);
    setIsLoading(true);
    const data = await searchForItems(query);
    setItems(data);
    setIsLoading(false);
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
        <button onClick={handleSearch}>
           <span className="button-label">Search</span>
        </button>
      </div>
      <div>{isLoading ? <LoadingSpinner /> :
      (
        showItems && (
          <div>
            {items.length > 0 ? (
              <Item items={items} />
            ) : (
              <h3>Nič sa nenašlo...</h3>
            )}
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default SearchBar;
