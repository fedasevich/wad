import { useStore } from '../../../../../store';
import { getCategoryBackgroundColorByIconId } from '../../../../../ui/Icons/CategoryIcons/CategoryIcons';
import { getDateRangeOptions } from '../../../../../utils/constants';

export const processChartData = (data, chartRange) => {
  const { category } = useStore();

  const chartData = {
    labels: [],
    datasets: []
  };

  const daysMap = new Map();

  data.forEach((transaction) => {
    const createdAt = new Date(transaction.createdAt);
    const dateKey = getDateRangeOptions(createdAt, chartRange).print;

    if (!daysMap.has(dateKey)) {
      daysMap.set(dateKey, new Map());
      chartData.labels.push(dateKey);
    }

    const { categoryId, description, sum, id } = transaction;

    if (!daysMap.get(dateKey).has(id)) {
      daysMap.get(dateKey).set(id, {
        label: description,
        data: [],
        backgroundColor: getCategoryBackgroundColorByIconId(category.getIconIdFromCategoryById(categoryId))
      });
    }

    daysMap.get(dateKey).get(id).data.push(Number(sum));
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const [dateKey, categoriesMap] of daysMap.entries()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [_, categoryData] of categoriesMap.entries()) {
      if (!chartData.datasets.find((dataset) => dataset.label === categoryData.label)) {
        chartData.datasets.push({
          label: categoryData.label,
          data: new Array(chartData.labels.length).fill(0),
          backgroundColor: categoryData.backgroundColor
        });
      }
      const dataIndex = chartData.labels.indexOf(dateKey);
      chartData.datasets.find((dataset) => dataset.label === categoryData.label).data[dataIndex] += Number(
        categoryData.data.reduce((total, value) => total - value, 0).toFixed(2)
      );
    }
  }

  return chartData;
};
