import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart';


import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  console.log("coinId: ", coinId);
  console.log("cryptoDetails", data);
  console.log("coinHistory", coinHistory);

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];


  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  // slug: alt names for that crypto coin

  return (
    <>
      <div class="card border-secondary mb-3" style={{ maxwidth: "20rem" }}>
        <div class="card-body">
          <h4 class="card-title">{data?.data?.coin.name} ({data?.data?.coin.slug}) Price</h4>
          <p class="card-text">{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav me-auto">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
          </div>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-sm-2" type="text" 
        defaultValue="7d" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}/>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </form>
    </div>
  </div>
</nav>


      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <div class="card border-secondary mb-3" style={{ maxwidth: "20rem" }}>
        <div class="card-body">
          <h4 class="card-title">{data?.data?.coin.name} ({data?.data?.coin.slug}) Price</h4>
          <p class="card-text"> An overview showing the stats of {cryptoDetails.name}</p>
        </div>
      </div>

      {stats.map(({ icon, title, value }) => (
        <Col className='coin-stats'>
          <Col className='coin-stats-name'>
            <Text>{icon}</Text>
            <Text>{title}</Text>
          </Col>
          <Text className='stats'>{value}</Text>
        </Col>
      ))}

      <Col className='other-stats-info'>
        <Col className='coin-value-statistics-heading'>
          <Title level={3} className='coin-details-heading'>
            Other Statistics
          </Title>
          <p>
            An overview showing the stats of cryptocurrencies
          </p>
        </Col>
        {genericStats.map(({ icon, title, value }) => (
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>
        ))}
      </Col>

      <div class="card border-secondary mb-3" style={{ maxwidth: "20rem" }}>
        <div class="card-body">
          <h4 class="card-title"> What is {cryptoDetails.name}</h4>
          <p class="card-text">{HTMLReactParser(cryptoDetails.description)}</p>
        </div>
      </div>

      <h4> {cryptoDetails.name}</h4>
      {cryptoDetails.links.map((link) => (
        <Row className='coin-link' key={link.name}>
          <Title level={5} className='link-name'>
            {link.type}
          </Title>
          <a href={link.url} target="_blank" rel='noreferrer'>
            {link.name}
          </a>
        </Row>
      ))}

    </>

  )
}

export default CryptoDetails;
