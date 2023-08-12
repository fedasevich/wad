import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useStore } from '../../../store';
import { getCategoryBackgroundColorByIconId } from '../../../ui/Icons/CategoryIcons/CategoryIcons';
import { getDateRangeOptions } from '../../../utils/constants';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);


export const options = {
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    maintainAspectRatio: false
};


export const AnalyticsChart = observer(({ transactions, chartRange }) => {
    const { category } = useStore()

    if (!category.categories.length) {
        return (<h2>loading</h2>)
    }

    const [expanded, setExpanded] = useState(false)

    const handleExpandedToggle = () => {
        setExpanded(prev => !prev)
    }


    const processChartData = (data) => {
        const chartData = {
            labels: [],
            datasets: [],
        };

        const daysMap = new Map();

        data.forEach((transaction) => {
            const createdAt = new Date(transaction.createdAt);
            const dateKey = getDateRangeOptions(createdAt, chartRange).print

            if (!daysMap.has(dateKey)) {
                daysMap.set(dateKey, new Map());
                chartData.labels.push(dateKey);
            }

            const { categoryId, description, sum, id } = transaction;

            if (!daysMap.get(dateKey).has(id)) {
                daysMap.get(dateKey).set(id, {
                    label: description,
                    data: [],
                    backgroundColor: getCategoryBackgroundColorByIconId(
                        category.getRegularCategoryById(categoryId).iconId || 1
                    ),
                });
            }

            daysMap.get(dateKey).get(id).data.push(Number(sum));
        });

        for (const [dateKey, categoriesMap] of daysMap.entries()) {
            for (const [category, data] of categoriesMap.entries()) {
                if (!chartData.datasets.find((dataset) => dataset.label === data.label)) {
                    chartData.datasets.push({
                        label: data.label,
                        data: new Array(chartData.labels.length).fill(0),
                        backgroundColor: data.backgroundColor,
                    });
                }
                const dataIndex = chartData.labels.indexOf(dateKey);
                chartData.datasets.find((dataset) => dataset.label === data.label).data[
                    dataIndex
                ] += data.data.reduce((total, value) => total + value, 0);
            }
        }

        return chartData;
    };
    return (
        <>
            <div className="analytics-chart-container">
                <div className={`analytics-chart ${expanded ? "expanded" : ""}`}>
                    <Bar options={options} data={processChartData(transactions)} />
                </div>
                <div className="d-flex d-md-none justify-content-end expand-button">
                    <Button className="bg-light-blue border-0" onClick={handleExpandedToggle}>
                        ⌄
                    </Button>
                </div>
            </div>
        </>
    );
})