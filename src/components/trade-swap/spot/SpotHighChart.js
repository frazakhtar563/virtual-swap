import React from "react";
import HighchartsExporting from 'highcharts/modules/exporting'
import { render } from "react-dom";
import Highcharts, { color } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

const SpotHighChart = () => {
    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
    }
  let [chartData, setChartData] = useState([]);
  const getData = async () => {
    try {
      let { data } = await axios.get(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
      );
      console.log("data...........", data);
      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const options = {
    title: {
      text: 'Hollow Candlestick Chart'
    },
    chart:{
      backgroundColor:'var(--logo-text)'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      lineColor:'#FFFFF',
      labels: {
        style: {
          color: 'var(--ul-clr)' // set the X-axis label color to blue
        }
      }
    },
    yAxis: {
      title: {
        text: 'Price',
      },
      lineColor:'var(--ul-clr)',
      gridLineColor:'#FFFFF',
      labels: {
        style: {
          color: 'var(--ul-clr)' // set the X-axis label color to blue
        }
      }
    },
  
    series: [{
      type: 'candlestick',
      name: 'Price',
      data: [
        [6, 5, 4, 2],
        [1, 4, 5, 3],
        [4, 3, 6, 5],
        [6, 5, 4, 2],
        [5, 6, 3, 4],
        [6, 5, 4, 2],
        [3, 2, 5, 6],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [1, 4, 5, 3],
        [4, 3, 6, 5],
        [6, 5, 4, 2],
        [5, 6, 3, 4],
        [6, 5, 4, 2],
        [3, 2, 5, 6],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [1, 4, 5, 3],
        [4, 3, 6, 5],
        [6, 5, 4, 2],
        [5, 6, 3, 4],
        [6, 5, 4, 2],
        [3, 2, 5, 6],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [1, 4, 5, 3],
        [4, 3, 6, 5],
        [6, 5, 4, 2],
        [5, 6, 3, 4],
        [6, 5, 4, 2],
        [3, 2, 5, 6],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [1, 4, 5, 3],
        [4, 3, 6, 5],
        [6, 5, 4, 2],
        [5, 6, 3, 4],
        [6, 5, 4, 2],
        [3, 2, 5, 6],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2],
        [6, 5, 4, 2]
      ],
      color: 'green',
      upColor: 'red',
      lineColor: 'black',
      upLineColor: 'black'
    }]
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SpotHighChart;
