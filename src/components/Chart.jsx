import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = React.memo(({sparkline, priceChange}) => {
	const [chartOptions, setChartOptions] = useState(null);

	useEffect(() => {
		function chartColor() {
			if(priceChange <= 0) {
				return '#e3342f';
			} else {
				return '#61e72c';
			}
		}

		setChartOptions({
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
	}, [sparkline, priceChange]);

	if (!chartOptions) {
		return <div>Loading chart...</div>; // Loading message
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
});

export default Chart;