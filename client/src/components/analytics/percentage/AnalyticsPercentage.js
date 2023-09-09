import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { useStore } from '../../../store';
import { AnalyticsPercentageItem } from './AnalyticsPercentageItem';
import { AnalyticsShowMore } from './AnalyticsShowMore';

export const ANALYTICS_CATEGORIES_TO_SHOW = 2;

const getProgressBarPercentage = (spent, totalSpent) => ((spent / totalSpent) * 100).toFixed(1);

export const AnalyticsPercentage = observer(() => {
  const { category } = useStore();
  const [showMore, setShowMore] = useState(false);

  const sortedParsedCategories = useMemo(
    () =>
      [...category.parsedCategories]
        .filter((category) => category.spent > 0)
        .sort((first, second) => second.spent - first.spent),
    [category.parsedCategories]
  );

  const [firstCategories, otherCategories] = useMemo(
    () => [
      sortedParsedCategories.slice(0, ANALYTICS_CATEGORIES_TO_SHOW),
      sortedParsedCategories.slice(ANALYTICS_CATEGORIES_TO_SHOW)
    ],
    [sortedParsedCategories]
  );

  const totalSpent = useMemo(
    () => sortedParsedCategories.reduce((acc, item) => acc + item.spent, 0),
    [sortedParsedCategories]
  );

  const otherCategoriesSpent = useMemo(
    () => otherCategories.reduce((acc, item) => acc + item.spent, 0),
    [otherCategories]
  );

  const handleShowMoreToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <h3 className="fw-medium">Percentage</h3>
      {firstCategories.map((categoryItem) => (
        <AnalyticsPercentageItem
          key={categoryItem.id}
          categoryItem={categoryItem}
          progressBarPercentage={getProgressBarPercentage(categoryItem.spent, totalSpent)}
        />
      ))}
      {!!otherCategories.length && !showMore && (
        <AnalyticsShowMore
          onClick={handleShowMoreToggle}
          spent={otherCategoriesSpent}
          percentage={getProgressBarPercentage(otherCategoriesSpent, totalSpent)}
        />
      )}
      {showMore &&
        otherCategories.map((categoryItem) => (
          <AnalyticsPercentageItem
            onClick={handleShowMoreToggle}
            key={categoryItem.id}
            categoryItem={categoryItem}
            progressBarPercentage={getProgressBarPercentage(categoryItem.spent, totalSpent)}
          />
        ))}
    </>
  );
});
