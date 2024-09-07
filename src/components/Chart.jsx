import React from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({sparkline, priceChange}) => {
	const [chartOptions] = useState({
		series: [{
			data: [...sparkline.price],
		}],
		chart: {
			height: 50,
			width: 150,
			type: 'line',
			sparkline: {enabled: true},
			animations: {enabled: false},
			zoom: {
				enabled: false,
			},
		},
		tooltip: {enabled: false},
		stroke: {width: 0.5},
		colors: [chartColor()],
	});

	function chartColor() {
		if(priceChange <= 0) {
			 return '#e3342f';
		} else {
			 return '#61e72c';
		}
  }

	return (
		<ReactApexChart
			options={chartOptions}
			series={chartOptions.series}
			type="line"
			height={50}
			width={150}
		/>
	);
};

export default Chart;