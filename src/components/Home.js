import React from 'react';
import SideBar from './sideBar/SideBar';
import SearchBar from './searchBar/SearchBar';
import './Home.css';

const Home = () => {

  return (
    <div className='Container'>
        <div className='SideBar'>
            <SideBar />
        </div>
        <div className="Content">
            <div className='SearchBar'>
                <SearchBar />
            </div>
        </div>
    </div>
  );
};

export default Home;
