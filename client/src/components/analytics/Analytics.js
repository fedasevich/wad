import { endOfMonth, startOfMonth } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import PageProvider from '../../pages/PageProvider';
import { useStore } from '../../store';
import CategoryStore from '../../store/CategoryStore';
import MenuProvider from '../MenuProvider';
import DatePickerProvider from '../date-picker/DatePickerProvider';
import Loader from '../loader/Loader';
import { AnalyticsSelect } from './AnalyticsSelect';
import './AnalyticsStyle.css';
import { AnalyticsChart } from './chart/AnalyticsChart';
import { AnalyticsPercentage } from './percentage/AnalyticsPercentage';
import { AnalyticsStatistics } from './statistics/AnalyticsStatistics';

const AnalyticsHOC = (WrappedComponent) => {
  return (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.transactions.length) {
      return <WrappedComponent {...props} />;
    }

    return <p>There is no statistics</p>;
  };
};

export const Analytics = observer(() => {
  const { category } = useStore();

  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: 'selection',
      action: 'month'
    }
  ]);
  const [chartRange, setChartRange] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    try {
      CategoryStore.fetchCategoryPeriod(dateRange)
        .then((data) => {
          setTransactions(data.rows);
          category.parseCategories(data);
        })
        .finally(() => setLoading(false));
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }, [category, dateRange]);

  if (loading || !category.categories.length) {
    return <Loader isFullHeight />;
  }

  const HOCAnalyticsPercentage = AnalyticsHOC(AnalyticsPercentage);
  const HOCAnalyticsStatistics = AnalyticsHOC(AnalyticsStatistics);

  return (
    <Row>
      <PageProvider.Header pageName="Analytics">
        <Col xs={{ span: 5, offset: 2 }} className="d-flex align-items-center justify-content-center flex-column">
          <DatePickerProvider dateRange={dateRange} setDateRange={setDateRange} />
          <AnalyticsSelect chartRange={chartRange} setChartRange={setChartRange} />
        </Col>
      </PageProvider.Header>
      <Col md={{ offset: 1, span: 10 }}>
        <MenuProvider>
          <MenuProvider.Container>
            <AnalyticsChart transactions={transactions} chartRange={chartRange} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
      <Col md={{ offset: 1, span: 6 }} className="percentage">
        <MenuProvider className="percentage-menu">
          <MenuProvider.Container>
            <HOCAnalyticsPercentage transactions={transactions} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
      <Col md={{ span: 4 }} className="statistics">
        <MenuProvider className="statistics-menu">
          <MenuProvider.Container>
            <HOCAnalyticsStatistics transactions={transactions} chartRange={chartRange} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
    </Row>
  );
});
