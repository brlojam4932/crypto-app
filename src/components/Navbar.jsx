import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  useEffect(() => {
    if (screenSize < 768) { // mobile or tablet
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }

  }, [screenSize]);

  return (
    <div className='container max-width 960px'>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand">Navbar</Link>
          <button class="navbar-toggler" type="button" onClick={() => setActiveMenu(!activeMenu)} data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link to='/' class="nav-link">Home
                  <span class="visually-hidden">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/cryptocurrencies' class="nav-link">Cryptocurrencies</Link>
              </li>
              <li class="nav-item">
                <Link to='/exchanges' class="nav-link">Exchanges</Link>
              </li>
              <li class="nav-item">
                <Link to='/news' class="nav-link">News</Link>
              </li>
           
            </ul>
           
          </div>
        </div>
      </nav>
    </div>

  );
};

export default Navbar;
