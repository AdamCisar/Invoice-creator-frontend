import React from 'react';
import './Home.css';
import SideBar from '../sideBar/SideBar';
import SearchBar from '../searchBar/SearchBar';

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
