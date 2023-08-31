import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { ArrowDownIcon } from '../../../ui/Icons/ControlIcons/ControlIcons';
import { processChartData } from './libs/helpers/processChartData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  },
  maintainAspectRatio: false
};

export const AnalyticsChart = observer(({ transactions, chartRange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandedToggle = () => {
    setExpanded((prev) => !prev);
  };

  const processedData = processChartData(transactions, chartRange);
  return (
    <div className="analytics-chart-container">
      <div className={`analytics-chart ${expanded ? 'expanded' : ''}`} data-testid="analytics-chart">
        <Bar options={options} data={processedData} />
      </div>
      <div className="d-flex d-md-none justify-content-end expand-button">
        <Button className="bg-light-blue border-0" onClick={handleExpandedToggle} data-testid="expand-button">
          <ArrowDownIcon />
        </Button>
      </div>
    </div>
  );
});
