import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  fromUnixTime,
  lastDayOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns';

export const MAIN_ROUTE = '/main';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const CATEGORY_ROUTE = '/category';
export const ANALYTICS_ROUTE = '/analytics';
export const WALLET_ROUTE = '/wallet';
export const SETTINGS_ROUTE = '/settings';
export const NOT_IMPLEMENTED_ROUTE = '/not-implemented';

export const categoryIconsColors = {
  DELETED: '#999999',
  CLOTHES: '#73e1c4',
  EDUCATION: '#7340e3',
  COSMETICS: '#fa0834',
  SPORTS: '#d27afc',
  TRANSPORT: '#af0c5b',
  HEALTH: '#7aaffc',
  GROCERIES: '#88e268',
  HOUSE: '#ff5c00',
  OFFICE: '#ff4f6c',
  FLOWERS: '#cf5bca',
  HOUSEHOLD_APPLIANCES: '#d2b48c',
  BOOKS: '#00008b',
  GIFTS: '#ff4500',
  CINEMA: '#9b64e6',
  FUEL: '#556b2f',
  AIR_TRAVEL: '#add8e6',
  INSURANCE: '#ffaf14',
  LOAN_REPAYMENT: '#45956e',
  INVESTMENTS: '#14cf5c',
  ENTERTAINMENT: '#24ce9d',
  CHARITY: '#00c1af',
  TAXI: '#fdb813',
  PHONE: '#8ca3b3',
  JEWELRY: '#00ced1',
  INTERNET: '#008b8b',
  TRAVELS: '#4186ee',
  RENTAL_HOUSING: '#139bd5',
  ANIMALS: '#fb7f25',
  CAR: '#8c736c',
  CAFES_AND_RESTAURANTS: '#9b64e6',
  INCOME: '#009788'
};

export const TRANSACTION_LIMITS = [5, 10, 20, 30];

export const dateRangeOptions = {
  ALL_TIME: 'all-time',
  WEEK: 'week',
  YEAR: 'year',
  MONTH: 'month',
  TODAY: 'today',
  BY_DAY: 'by-day'
};

export const getDateRangeOptions = (date, action) => {
  switch (action) {
    case dateRangeOptions.ALL_TIME:
      return {
        start: fromUnixTime(0),
        end: date,
        action: dateRangeOptions.ALL_TIME,
        print: 'All time'
      };
    case dateRangeOptions.WEEK:
      return {
        start: startOfWeek(date),
        end: lastDayOfWeek(date),
        action: dateRangeOptions.WEEK,
        print: `${format(startOfWeek(date), 'd.M')} - ${format(lastDayOfWeek(date), 'd.M')}`
      };
    case dateRangeOptions.YEAR:
      return {
        start: startOfYear(date),
        end: endOfYear(date),
        action: dateRangeOptions.YEAR,
        print: format(date, 'y')
      };
    case dateRangeOptions.MONTH:
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
        action: dateRangeOptions.MONTH,
        print: format(date, 'MMMM y')
      };
    case dateRangeOptions.TODAY:
      return {
        start: startOfDay(date),
        end: endOfDay(date),
        action: dateRangeOptions.TODAY,
        print: format(date, 'd.M')
      };
    case dateRangeOptions.BY_DAY:
      return {
        start: startOfDay(date),
        end: endOfDay(date),
        action: dateRangeOptions.BY_DAY,
        print: format(date, 'd.M')
      };
    default:
      return {
        start: startOfDay(date),
        end: endOfDay(date),
        action: dateRangeOptions.BY_DAY,
        print: format(date, 'yyyy-MM-dd')
      };
  }
};

export const themes = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light'
};

export const MAX_CATEGORY_NAME_LENGTH = 8;

export const WALLET_PAGE_STATE = {
  EDIT_WALLET: 'EDIT_WALLET',
  RECHARGE_WALLET: 'RECHARGE_WALLET',
  TRANSACTIONS_WALLET: 'TRANSACTIONS_WALLET',
  TRANSFER_WALLET: 'TRANSFER_WALLET',
  DEFAULT_WALLET: 'DEFAULT_WALLET',
  CREATE_WALLET: 'CREATE_WALLET',
  DEFAULT: 'DEFAULT'
};

export const negateNumber = (number) => {
  return -number;
};
