import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              ticks: { autoSkip: false },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartContainer} />;
};

export default BarChart;
