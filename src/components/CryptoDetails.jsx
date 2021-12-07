import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
//import {parse, stringify, toJSON, fromJSON} from 'flatted';


import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
//const { Option } = Select;

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

  const time = ['24h', '7d', '30d', '1y', '5y'];

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
      <div className="card border-secondary mb-3" style={{ maxwidth: "20rem" }}>
        <div className="card-body">
          <h4 className="card-title">{data?.data?.coin.name} ({data?.data?.coin.slug}) Price</h4>
          <p className="card-text">{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </div>
      </div>

      <div className="form-group">
        <label for="exampleSelect1" className="form-label mt-4">Select Timeperiod</label>
        <select  
        className="form-select" 
        id="exampleSelect1" 
        value={timeperiod}
        onChange={(e) => setTimeperiod(e.target.value)}>
        {time.map((date) => <option key={date}>{date}</option>)}
        </select>
      </div>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <div className="card border-secondary mb-3" style={{ maxwidth: "20rem" }}>
        <div className="card-body">
          <h4 className="card-title">{data?.data?.coin.name} ({data?.data?.coin.slug}) Price</h4>
          <p className="card-text"> An overview showing the stats of {cryptoDetails.name}</p>
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
