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
    <div className='container max-width 960px'>
      {/* ----------Global Stats---------- */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Total Crypto Coins</th>
            <th scope="col">Total Markets</th>
            <th scope="col">Total Exchanges</th>
            <th scope="col">Total Market Cap:</th>
            <th scope="col">Total 24h Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr className="secondary">
            <td>{globalStats.total}</td>
            <td>{millify(globalStats.totalMarkets)}</td>
            <td>{millify(globalStats.totalExchanges)}</td>
            <td>{`$${millify(globalStats.totalMarketCap)}`}</td>
            <td>{`$${millify(globalStats.total24hVolume)}`}</td>
            
          </tr>
        </tbody>
      </table>

      {/* ----------Cryptos Listed---------- */}

      <div className="list-group">
        <h4>Top 10 Cryptos In The World</h4>
        <Link to="/cryptocurrencies"
          type="button" 
          class="btn btn-outline-primary"
          style={{width: "50%"}}
          >
          Show more
        </Link>
      </div>
      <br />
      <br />
      <Cryptocurrencies simplified />
      <div className="list-group">
        <h4>Latest Crypto News</h4>
        <Link to="/news">Show more news</Link>
      </div>
      {/* ----------NEWS---------- */}
      <News simplified />
    </div>
  );
};

export default HomePage;
