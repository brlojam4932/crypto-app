import React, { useEffect, useState } from 'react';
import '../App.css';
import millify from 'millify';
import { Link } from 'react-router-dom';
//import { Card, Row, Col, Input, Typography, Avatar, Collapse } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import styled from 'styled-components';

//const { Text } = Typography;
//const { Panel } = Collapse;

// add empty space: &nbsp;

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  //console.log('cryptos: ', cryptos);
  //console.log('count: ', count);
  //console.log('simplified: ', simplified);
  //console.log('isFetching: ', isFetching);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

    setCryptos(filterData);

  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";
  console.log("isFetching2: ", isFetching);

  const Img = styled.img`
  max-width: 33px`;

  return (
    <div className='container max-width 960px'>
      <form class="d-flex">
        <input class="form-control me-sm-2" type="text" placeholder="Search Cryptocurrency" onChange={(event) => setSearchTerm(event.target.value)} style={{width: "50%"}} />
      </form>

      <ul className="coinlist list-group mt-2">
        {cryptos?.map((currency) => (
          <Link to={`/crypto/${currency.id}`} className='text-decoration-none my-1 coin'>
            <li className='coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark'>
              <Img className="crypto-image" alt="crypto-Logo" src={currency.iconUrl} />
              <span >{currency.name}</span>
              <span className='text-decoration-none'>$&nbsp;{millify(currency.price, {precision: 3, decimalSeperator: ","})}</span>
              <span className='text-decoration-none'>Mkt Cap&nbsp;{millify(currency.marketCap)}</span>
              {currency.change < 0 ? (
                <span className='text-decoration-none' className="coin-percent red">{currency.change}</span>
              ) : (<span className='text-decoration-none' className="coin-percent green">{currency.change}%</span>)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
};

export default Cryptocurrencies;
