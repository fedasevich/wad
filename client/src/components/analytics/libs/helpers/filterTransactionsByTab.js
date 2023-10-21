import { negateNumber } from '../../../../utils/constants';
import { ANALYTICS_CHART_TABS } from '../../Analytics';

export const filterTransactionsByTab = (transactions, selectedTab) => {
  const isIncome = selectedTab === ANALYTICS_CHART_TABS.INCOME;
  const isExpense = selectedTab === ANALYTICS_CHART_TABS.EXPENSE;

  return transactions
    .filter((transaction) => {
      const isExpenseTransaction = isExpense && transaction.sum < 0;
      const isIncomeTransaction = isIncome && transaction.sum > 0;

      return isExpenseTransaction || isIncomeTransaction;
    })
    .map((transaction) => {
      if (isIncome) {
        return { ...transaction, sum: negateNumber(transaction.sum) };
      }
      return transaction;
    });
};
