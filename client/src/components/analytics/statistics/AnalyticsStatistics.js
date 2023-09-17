import { parseISO, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
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
      const dayDiff = startOfDay(date);
      const weekDiff = startOfWeek(date);
      const monthDiff = startOfMonth(date);
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
    const fixedTotalSpent = totalSpent.toFixed(2);
    return {
      dailyAverage,
      weeklyAverage,
      monthlyAverage,
      fixedTotalSpent
    };
  }, [transactions]);

  return (
    <>
      <h3 className="fw-medium">Statistics</h3>
      <p>Daily Average: {groupTransactions.dailyAverage}</p>
      <p>Weekly Average: {groupTransactions.weeklyAverage}</p>
      <p>Monthly Average: {groupTransactions.monthlyAverage}</p>
      <p>Total Spent: {groupTransactions.fixedTotalSpent}</p>
    </>
  );
});
