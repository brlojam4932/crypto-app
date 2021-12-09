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


    <div className='container-md'>
      {/*
       <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Total Crypto</th>
            <th scope="col">Total Exchanges</th>
            <th scope="col">Total Market Cap:</th>
            <th scope="col">Total 24h Volume</th>
            <th scope="col">Total Markets</th>
          </tr>
        </thead>
        <tbody>
          <tr className="secondary">
            <th scope="row">Info</th>
            <td>{globalStats.total}</td>
            <td>{millify(globalStats.totalExchanges)}</td>
            <td>{`$${millify(globalStats.total24hVolume)}`}</td>
            <td>{millify(globalStats.totalMarkets)}</td>
          </tr>
        </tbody>
      </table>
       */}

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Exchanges</th>
            <th>24h trade Volume</th>
            <th>Markets</th>
            <th>Change</th>
          </tr>
        </thead>
        {exchangesList.map((exchange) => (
          <tbody key={exchange.id}>
            <tr className="secondary"  key={exchange.id}   showarrow="false">
              <td>
                <h6><strong>{exchange.rank}</strong></h6>
                <Img className='exchange-image' src={exchange.iconUrl} />
                <p><strong>{exchange.name}</strong></p>
              </td>
              <td>$&nbsp;{millify(exchange.volume)}</td>
              <td>$&nbsp;{millify(exchange.numberOfMarkets)}</td>
              <td>$&nbsp;{millify(exchange.marketShare)}</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td><small>{HTMLReactParser(exchange.description || '')}</small></td>
            </tr>
         
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Exchanges;