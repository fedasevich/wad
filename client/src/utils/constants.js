import { endOfDay, endOfMonth, endOfYear, format, fromUnixTime, lastDayOfWeek, startOfDay, startOfMonth, startOfWeek, startOfYear } from "date-fns"

export const MAIN_ROUTE = '/main'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const CATEGORY_ROUTE = '/category'
export const ANALYTICS_ROUTE = '/analytics'
export const WALLET_ROUTE = '/wallet'
export const SETTINGS_ROUTE = '/settings'
export const NOT_IMPLEMENTED_ROUTE = '/not-implemented'


export const mainCurrencies = {
    name: "Main currencies",
    data: [
        { currency: "Euro", symbol: "€" },
        { currency: "United States dollar", symbol: "$" },
        { currency: "Ukrainian hryvnia", symbol: "₴" },
        { currency: "Czech koruna", symbol: "Kč" },
        { currency: "Polish złoty", symbol: "zł" },
    ]
}


export const cryptoCurrencies = {
    name: "Crypto currencies",
    data: [
        { currency: "Bitcoin", symbol: "BTC" },
        { currency: "Ethereum", symbol: "ETH" },
        { currency: "NXT", symbol: "NXT" },
        { currency: "USD Tether", symbol: "USDT" },
    ]
}

export const categoryIconsColors = {
    CLOTHES: '#80FBDB',
    EDUCATION: '#412285',
    COSMETICS: '#FA0834',
    SPORTS: '#D27AFC',
    TRANSPORT: '#AF0C5B',
    HEALTH: '#7AAFFC',
    GROCERIES: '#88E268'
}


export const TRANSACTION_LIMITS = [5, 10, 20, 30]


export const dateRangeOptions = {
    ALL_TIME: "all-time",
    WEEK: "week",
    YEAR: "year",
    MONTH: "month",
    TODAY: "today",
    BY_DAY: "by-day"
};

export const getDateRangeOptions = (date, action) => {
    switch (action) {
        case dateRangeOptions.ALL_TIME:
            return {
                start: fromUnixTime(0),
                end: date,
                action: dateRangeOptions.ALL_TIME,
                print: "All time"
            }
        case dateRangeOptions.WEEK:
            return {
                start: startOfWeek(date),
                end: lastDayOfWeek(date),
                action: dateRangeOptions.WEEK,
                print: format(startOfWeek(date), 'd.M') + " - " + format(lastDayOfWeek(date), 'd.M')
            }
        case dateRangeOptions.YEAR:
            return {
                start: startOfYear(date),
                end: endOfYear(date),
                action: dateRangeOptions.YEAR,
                print: format(date, 'y')
            }
        case dateRangeOptions.MONTH:
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
                action: dateRangeOptions.MONTH,
                print: format(date, 'MMMM y')
            }
        case dateRangeOptions.TODAY:
            return {
                start: startOfDay(date),
                end: endOfDay(date),
                action: dateRangeOptions.TODAY,
                print: format(date, 'd.M')
            }
        case dateRangeOptions.BY_DAY:
            return {
                start: startOfDay(date),
                end: endOfDay(date),
                action: dateRangeOptions.BY_DAY,
                print: format(date, 'd.M')
            }
        default:
            return {
                start: startOfDay(date),
                end: endOfDay(date),
                action: dateRangeOptions.BY_DAY,
                print: format(date, 'yyyy-MM-dd')
            }
    }
}


export const themes = {
    DEFAULT: 'default',
    DARK: 'dark',
    LIGHT: 'light',
};