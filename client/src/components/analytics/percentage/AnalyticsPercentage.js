import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../../..';
import { AnalyticsPercentageItem } from './AnalyticsPercentageItem';
import { AnalyticsShowMore } from './AnalyticsShowMore';


import { useMemo } from 'react';


const CATEGORIES_TO_SHOW = 2


const getProgressBarPercentage = (spent, totalSpent) => ((spent / totalSpent) * 100).toFixed(1)

export const AnalyticsPercentage = observer(() => {
    const { category } = useContext(Context);
    const [showMore, setShowMore] = useState(false);

    const sortedParsedCategories = useMemo(() =>
        [...category.parsedCategories].filter((category => category.spent > 0)).sort((first, second) => second.spent - first.spent),
        [category.parsedCategories]);

    const [firstCategories, otherCategories] = useMemo(() =>
        [sortedParsedCategories.slice(0, CATEGORIES_TO_SHOW), sortedParsedCategories.slice(CATEGORIES_TO_SHOW)],
        [sortedParsedCategories]);

    const totalSpent = useMemo(() =>
        sortedParsedCategories.reduce((acc, item) => acc + item.spent, 0),
        [sortedParsedCategories]);

    const otherCategoriesSpent = useMemo(() =>
        otherCategories.reduce((acc, item) => acc + item.spent, 0),
        [otherCategories]);

    const handleShowMoreToggle = () => {
        setShowMore(prev => !prev);
    };

    return (<>
        {firstCategories.map((categoryItem) =>
            <AnalyticsPercentageItem key={categoryItem.id} categoryItem={categoryItem} progressBarPercentage={getProgressBarPercentage(categoryItem.spent, totalSpent)} />
        )}
        {!!otherCategories.length && !showMore && <AnalyticsShowMore onClick={handleShowMoreToggle} spent={otherCategoriesSpent} percentage={getProgressBarPercentage(otherCategoriesSpent, totalSpent)} />}
        {showMore && otherCategories.map((categoryItem) =>
            <AnalyticsPercentageItem onClick={handleShowMoreToggle} key={categoryItem.id} categoryItem={categoryItem} progressBarPercentage={getProgressBarPercentage(categoryItem.spent, totalSpent)} />
        )}
    </>);
});