import React, { useState } from 'react';
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import HTMLReactParser from 'html-react-parser';
import styled from 'styled-components';
import { accordionData } from './accordionData';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
//import Loader from "./Loader";

//const { Text } = Typography;
//const { Panel } = Collapse;

const Img = styled.img`
max-width: 33px
`;

const Table = styled.table``;
const Thead = styled.thead``;
const TR = styled.tr``;
const TH = styled.th``;
const Span = styled.span``;
const Tbody = styled.tbody``;

function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const [clicked, setClicked] = useState(false);

  const exchangesList = data?.data?.exchanges;

  if (isFetching) return "Loading...";

  const toggle = (id) => {
    if (clicked === id) {
      // if clicked "question", is already active, then close it
      return setClicked(null);
    }
    setClicked(id);
  };

  // stats, currencies, exchanges





  return (

    <div className="container-lg">
      <div className="row row-cols-4">
        <div className="col"></div>
        <div className='col'>22h Vol</div>
        <div className='col'>Markets</div>
        <div className='col'>Change</div>
      </div>
      <br />
      <br />
      {exchangesList.map((exchange) => (
        <div className='col'>
          <span>
            <div className="row row-cols-4">
              <div className='col'>
                <h6><strong>{exchange.rank}</strong></h6>
                <Img className='exchange-image' src={exchange.iconUrl} />
                <p><strong>{exchange.name}</strong></p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.volume)}</p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.numberOfMarkets)}</p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.marketShare)}</p>
              </div>
            </div>
            {HTMLReactParser(exchange.description || '')}
          </span>
        </div>
      ))}

    </div>
  );
};

export default Exchanges;