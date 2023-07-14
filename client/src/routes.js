import NotImplemented from "./components/NotImplemented"
import Auth from "./pages/Auth"
import Category from "./pages/Category"
import MainPage from "./pages/MainPage"
import { CATEGORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NOT_IMPLEMENTED_ROUTE, REGISTRATION_ROUTE } from "./utils/constants"

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: CATEGORY_ROUTE,
        Component: Category
    },
    // {
    //     path: WALLET_ROUTE,
    //     Component: Wallet
    // }
]


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: NOT_IMPLEMENTED_ROUTE,
        Component: NotImplemented
    }
]