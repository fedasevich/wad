import { differenceInDays, differenceInMonths, differenceInWeeks, parseISO } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react';

export const AnalyticsStatistics = observer(({ transactions }) => {
  const groupTransactions = React.useMemo(() => {
    const dailyGroup = {};
    const weeklyGroup = {};
    const monthlyGroup = {};
    let totalSpent = 0;

    transactions.forEach((transaction) => {
      const date = parseISO(transaction.createdAt);
      const dayDiff = differenceInDays(new Date(), date);
      const weekDiff = differenceInWeeks(new Date(), date);
      const monthDiff = differenceInMonths(new Date(), date);

      if (!dailyGroup[dayDiff]) dailyGroup[dayDiff] = [];
      if (!weeklyGroup[weekDiff]) weeklyGroup[weekDiff] = [];
      if (!monthlyGroup[monthDiff]) monthlyGroup[monthDiff] = [];

      dailyGroup[dayDiff].push(transaction);
      weeklyGroup[weekDiff].push(transaction);
      monthlyGroup[monthDiff].push(transaction);

      totalSpent += parseFloat(transaction.sum);
    });

    const dailyAverage = (totalSpent / Object.keys(dailyGroup).length).toFixed(2);
    const weeklyAverage = (totalSpent / Object.keys(weeklyGroup).length).toFixed(2);
    const monthlyAverage = (totalSpent / Object.keys(monthlyGroup).length).toFixed(2);

    return {
      dailyAverage,
      weeklyAverage,
      monthlyAverage
    };
  }, [transactions]);

  return (
    <>
      <h2>Statistics</h2>
      <p>Daily Average: {groupTransactions.dailyAverage}</p>
      <p>Weekly Average: {groupTransactions.weeklyAverage}</p>
      <p>Monthly Average: {groupTransactions.monthlyAverage}</p>
    </>
  );
});
