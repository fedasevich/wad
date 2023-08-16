import { lazy } from 'react';
import {
  ANALYTICS_ROUTE,
  CATEGORY_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NOT_IMPLEMENTED_ROUTE,
  REGISTRATION_ROUTE,
  SETTINGS_ROUTE
} from './utils/constants';

const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const Category = lazy(() => import('./pages/Category'));
const Auth = lazy(() => import('./pages/Auth'));
const NotImplemented = lazy(() => import('./components/NotImplemented'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));

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
    path: ANALYTICS_ROUTE,
    Component: AnalyticsPage
  },
  {
    path: SETTINGS_ROUTE,
    Component: SettingsPage
  }
];

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
];
