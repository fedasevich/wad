import { endOfMonth, startOfMonth } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Context } from '../..';
import PageProvider from '../../pages/PageProvider';
import MenuProvider from '../MenuProvider';
import DatePickerProvider from '../date-picker/DatePickerProvider';
import { AnalyticsSelect } from './AnalyticsSelect';
import './AnalyticsStyle.css';
import { AnalyticsChart } from './chart/AnalyticsChart';
import { AnalyticsPercentage } from './percentage/AnalyticsPercentage';
import { AnalyticsStatistics } from './statistics/AnalyticsStatistics';

const AnalyticsHOC = (WrappedComponent) => {
    return function (props) {
        if (props.transactions.length) {
            return <WrappedComponent {...props} />;
        } else {
            return <h2>There is no statistics</h2>;
        }
    };
};


export const Analytics = observer(() => {
    const { category } = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [dateRange, setDateRange] = useState([
        {
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            key: 'selection',
            action: 'month'
        }
    ]);
    const [chartRange, setChartRange] = useState('')
    const [transactions, setTransactions] = useState([])


    useEffect(() => {
        try {
            category.fetchCategoryPeriod(dateRange).then((data) => {
                setTransactions(data.rows);
                category.parseCategories(data)
            }).finally(() => setLoading(false))
        } catch (e) {
            alert(e.response.data.message);
        }
    }, [category, dateRange])

    if (loading || !category.categories.length) {
        return (<h2>loading</h2>)
    }

    const HOCAnalyticsPercentage = AnalyticsHOC(AnalyticsPercentage);
    const HOCAnalyticsStatistics = AnalyticsHOC(AnalyticsStatistics);

    return (
        <Row>
            <PageProvider.Header pageName={'Analytics'}>
                <Col xs={{ span: 5, offset: 2 }} className="d-flex align-items-center justify-content-center flex-column">
                    <DatePickerProvider dateRange={dateRange} setDateRange={setDateRange} />
                    <AnalyticsSelect chartRange={chartRange} setChartRange={setChartRange} />
                </Col>
            </PageProvider.Header >
            <Col md={{ offset: 1, span: 10 }} >
                <MenuProvider>
                    <MenuProvider.Container >
                        <AnalyticsChart transactions={transactions} chartRange={chartRange} />
                    </MenuProvider.Container>
                </MenuProvider>
            </Col>
            <Col md={{ offset: 1, span: 6 }} >
                <MenuProvider>
                    <MenuProvider.Container>
                        <HOCAnalyticsPercentage transactions={transactions} />
                    </MenuProvider.Container>
                </MenuProvider>
            </Col>
            <Col md={{ span: 4 }} >
                <MenuProvider>
                    <MenuProvider.Container>
                        <HOCAnalyticsStatistics transactions={transactions} chartRange={chartRange} />
                    </MenuProvider.Container>
                </MenuProvider>
            </Col>
        </Row>
    );
})