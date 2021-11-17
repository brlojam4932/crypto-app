import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

function News({ simplified }) {
  //debugger

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12
  })
 
  console.log('cryptoNews: ', cryptoNews);

  if(!cryptoNews?.value) return '...Loading';

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, i) => (
        <Col key={i} xs={24} sm={12} md={12} lg={8} xl={6}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer"></a>
            <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img style={{maxWidth: "200px", maxHeight: '100px'}} src= {news?.imge?.thumbnail?.contentUrl || demoImage} alt=''/>
            </div>
            <p>
              {news.description > 100 
              ? `${news.description.substring(0, 100)}...`
              : news.description
              }
            </p>
            <div className='provider-container'>
              <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              <Text className='provider-name'>{news.provider[0]?.name}</Text>
            </div>
            <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
          </Card>

        </Col>

      ))}

    </Row>
  )
}

export default News;
