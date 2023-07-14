export const MAIN_ROUTE = '/main'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const CATEGORY_ROUTE = '/category'
export const WALLET_ROUTE = '/wallet'
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
