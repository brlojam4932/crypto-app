import React from 'react';
import { Button, Menu, Typograpy, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large"/>
        <Typograpy.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typograpy.Title>
        <Button className="menu-control-container">

        </Button>

      </div>
    </div>
  )
}

export default Navbar
