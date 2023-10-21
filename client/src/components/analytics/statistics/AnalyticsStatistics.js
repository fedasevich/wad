import { parseISO, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../store';

export const AnalyticsStatistics = observer(({ transactions }) => {
  const { currency } = useStore();
  const groupTransactions = React.useMemo(() => {
    const dailyGroup = {};
    const weeklyGroup = {};
    const monthlyGroup = {};
    let total = 0;

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

      total -= parseFloat(transaction.sum);
    });

    const dailyAverage = (total / Object.keys(dailyGroup).length).toFixed(2);
    const weeklyAverage = (total / Object.keys(weeklyGroup).length).toFixed(2);
    const monthlyAverage = (total / Object.keys(monthlyGroup).length).toFixed(2);
    const fixedTotal = total.toFixed(2);
    return {
      dailyAverage,
      weeklyAverage,
      monthlyAverage,
      fixedTotal
    };
  }, [transactions]);

  return (
    <>
      <h3 className="fw-medium">Statistics</h3>
      <p>
        Daily Average: {groupTransactions.dailyAverage}
        {currency.userCurrency.symbol}
      </p>
      <p>
        Weekly Average: {groupTransactions.weeklyAverage}
        {currency.userCurrency.symbol}
      </p>
      <p>
        Monthly Average: {groupTransactions.monthlyAverage}
        {currency.userCurrency.symbol}
      </p>
      <p>
        Total: {groupTransactions.fixedTotal}
        {currency.userCurrency.symbol}
      </p>
    </>
  );
});
