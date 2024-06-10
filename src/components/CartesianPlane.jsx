/* eslint-disable react/prop-types */
// CartesianPlane.js
import { Scatter } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	zoomPlugin
);

const CartesianPlane = ({ points }) => {
	const data = {
		datasets: [
			{
				label: "Puntos",
				data: points,
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				showLine: true, // Para conectar los puntos con una línea
				fill: false,
			},
		],
	};

	const options = {
		scales: {
			x: {
				type: "linear",
				position: "bottom",
				title: {
					display: true,
					text: "Eje X",
				},
				grid: {
					display: true,
					color: "rgba(200, 200, 200, 0.8)",
				},
				min: -10,
				max: 10,
			},
			y: {
				type: "linear",
				position: "left",
				title: {
					display: true,
					text: "Eje Y",
				},
				grid: {
					display: true,
					color: "rgba(200, 200, 200, 0.8)",
				},
				min: -10,
				max: 10,
			},
		},
		plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }
    }
	};

	return <Scatter data={data} options={options} />;
};

export default CartesianPlane;
