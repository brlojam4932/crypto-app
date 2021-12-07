import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '.';

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return 'Loading...';


  return (
    <>
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

      <div className="list-group">
        <h4>Top 10 Cryptos In The World</h4>
        <Link to="/cryptocurrencies" className="list-group-item list-group-item-action active">Show more</Link>
      </div>
      <Cryptocurrencies simplified />
      <div className="list-group">
        <h4>Latest Crypto News</h4>
        <Link to="/news" >Show more news</Link>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
