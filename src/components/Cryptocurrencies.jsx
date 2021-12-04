import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography, Avatar, Collapse } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

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

  return (
    <>
      <div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={(event) => setSearchTerm(event.target.value)} />
      </div>

      <Row>
        <Col span={4}></Col>
        <Col span={4}>Name</Col>
        <Col span={4}>Price</Col>
        <Col span={4}>Market Cap</Col>
        <Col span={4}>Daily Change</Col>
      </Row>


      <Row>
        {cryptos?.map((currency) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={currency.id}
                showArrow={false}
                header={(
                  <Link key={currency.id} to={`/crypto/${currency.id}`}>
                    <Row key={currency.id}>
                      <Col span={4}>
                        <Avatar img className="crypto-image" alt="crypto-Logo" src={currency.iconUrl} />

                      </Col>
                      <Col span={4}>{currency.name}</Col>
                      <Col span={4}>{currency.price}</Col>
                      <Col span={4}>{currency.marketCap}</Col>
                      <Col span={4}>{currency.change}</Col>
                    </Row>
                  </Link>
                )}
              >
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>

  )
}

export default Cryptocurrencies;
