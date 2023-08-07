import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { dateRangeOptions } from '../../utils/constants';
import ArrowSelect from '../ArrowSelect';


const analyticsDateRangeOptions = Object.values(dateRangeOptions).filter(option => option !== dateRangeOptions.ALL_TIME && option !== dateRangeOptions.TODAY);

export const AnalyticsSelect = observer(({ chartRange, setChartRange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleArrowLeftClick = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + analyticsDateRangeOptions.length) % analyticsDateRangeOptions.length);
    };

    const handleArrowRightClick = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % analyticsDateRangeOptions.length);
    };

    useEffect(() => {
        setChartRange(analyticsDateRangeOptions[currentIndex])
    }, [currentIndex, setChartRange])


    return (
        <>
            <ArrowSelect
                handleArrowLeftClick={handleArrowLeftClick}
                handleArrowRightClick={handleArrowRightClick}
                textToPrint={chartRange}
            />
        </>
    )
})