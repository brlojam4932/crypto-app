import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
//import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
//import icon from '../images/cryptocurrency.png';

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Navbar</Link>
          <button className="navbar-toggler" type="button" onClick={() => setActiveMenu(!activeMenu)} data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to='/' className="nav-link">Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/cryptocurrencies' className="nav-link">Cryptocurrencies</Link>
              </li>
              <li className="nav-item">
                <Link to='/exchanges' className="nav-link">Exchanges</Link>
              </li>
              <li className="nav-item">
                <Link to='/news' className="nav-link">News</Link>
              </li>
           
            </ul>
           
          </div>
        </div>
      </nav>
    </div>

  );
};

export default Navbar;
