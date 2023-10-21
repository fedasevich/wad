import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useStore } from '../../../store';
import { ArrowDownIcon } from '../../../ui/Icons/ControlIcons/ControlIcons';
import { ANALYTICS_CHART_TABS } from '../Analytics';
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

export const AnalyticsChart = observer(({ transactions, chartRange, selectedTab, setSelectedTab }) => {
  const [expanded, setExpanded] = useState(false);

  const { userSettings } = useStore();

  const isThemeDark = userSettings.isThemeDark();

  ChartJS.defaults.color = isThemeDark ? '#fff' : '#676767';
  ChartJS.defaults.borderColor = isThemeDark ? '#fff' : '#cecece';

  const handleExpandedToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const processedData = processChartData(transactions, chartRange);

  return (
    <div className="analytics-chart-container">
      <div className={`analytics-chart ${expanded ? 'expanded' : ''}`} data-testid="analytics-chart">
        <Tabs id="controlled-tab-example" activeKey={selectedTab} onSelect={handleTabClick} className="mb-3">
          <Tab eventKey={ANALYTICS_CHART_TABS.EXPENSE} title="Expense">
            <Bar options={options} data={processedData} />
          </Tab>
          <Tab eventKey={ANALYTICS_CHART_TABS.INCOME} title="Income">
            <Bar options={options} data={processedData} />
          </Tab>
        </Tabs>
      </div>
      <div className="d-flex d-md-none justify-content-end expand-button">
        <Button className="bg-light-blue border-0" onClick={handleExpandedToggle} data-testid="expand-button">
          <ArrowDownIcon />
        </Button>
      </div>
    </div>
  );
});
