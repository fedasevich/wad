import { lazy } from "react";
import { CATEGORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NOT_IMPLEMENTED_ROUTE, REGISTRATION_ROUTE } from "./utils/constants";
const MainPage = lazy(() => import('./pages/MainPage'));
const Category = lazy(() => import('./pages/Category'));
const Auth = lazy(() => import('./pages/Auth'));
const NotImplemented = lazy(() => import('./components/NotImplemented'));

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