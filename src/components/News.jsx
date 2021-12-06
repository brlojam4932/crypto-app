import React, { useState } from 'react';
import { Select, Row, Col} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import styled from 'styled-components';


//const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

function News({ simplified }) {
  //debugger
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12 });
  console.log('cryptoNews: ', cryptoNews);

  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return '...Loading';

  const Img = styled.img`
  max-width: 33px`;

  return (
    <>

      <div className="container max-width 960px">
        <div className="row">
          {cryptoNews.value.map((news, i) => (
            <div className="col-6 col-sm-3" key={i}>
              <div className="card border-secondary mb-3" style={{ maxwidth: + '20rem' }}>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="card-body">
                    <h5 className="card-title">{news.name}</h5>
                    <img style={{ maxWidth: "200px", maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                    <p className="card-text">
                      {news.description > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description
                      }
                    </p>
                    <div className='container'>
                      <div>
                        <Img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                        <p className='provider-name'>{news.provider[0]?.name}</p>
                      </div>
                      <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default News;
