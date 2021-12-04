import React from 'react';
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const { Title } = Typography;

function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    // inside of the loop
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    // inside of the loop
    coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }


  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd"
      },
    ],

  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className='current-change'>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart;
