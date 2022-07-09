import Auth from "./pages/Auth"
import Category from "./pages/Category"
import MainPage from "./pages/MainPage"
import Wallet from "./pages/Wallet"
import { CATEGORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGESTRATION_ROUTE, WALLET_ROUTE } from "./utils/consts"

export const authRoutes = [
{
    path: MAIN_ROUTE,
    Component: MainPage
},
{
    path: CATEGORY_ROUTE,
    Component: Category
},
{
    path: WALLET_ROUTE,
    Component: Wallet
}
]


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },  
    {
        path: REGESTRATION_ROUTE,
        Component: Auth
    }
]