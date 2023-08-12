import { makeAutoObservable } from 'mobx';
import {
    makePersistable
} from "mobx-persist-store";
import { MAIN_ROUTE } from '../utils/constants';

export default class UserSettingsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this._startPage = MAIN_ROUTE;
        this._closeCalculatorOnSubmit = false
        this._persistTransactionFilter = false
        this._persistAnalyticsChartRange = false
        this._chartRange = undefined
        this._theme = 'dark'

        makeAutoObservable(this);
        makePersistable(this, {
            name: "userSettings",
            properties: ['_startPage', '_closeCalculatorOnSubmit', '_persistTransactionFilter', '_persistAnalyticsChartRange', '_chartRange', '_theme'],
            storage: window.localStorage
        }, { fireImmediately: true });
    }

    setStartPage(startPage) {
        this._startPage = startPage
    }

    get startPage() {
        return this._startPage
    }

    setCloseCalculatorOnSubmit(closeCalculatorOnSubmit) {
        console.log(this)
        this._closeCalculatorOnSubmit = closeCalculatorOnSubmit
    }

    get closeCalculatorOnSubmit() {
        return this._closeCalculatorOnSubmit
    }

    setPersistTransactionFilter(persistTransactionFilter) {
        if (!persistTransactionFilter) {
            this.rootStore.category.clearPersistence()
        }
        this._persistTransactionFilter = persistTransactionFilter
    }

    get persistTransactionFilter() {
        return this._persistTransactionFilter
    }

    setPersistAnalyticsChartRange(persistAnalyticsChartRange) {

        this._persistAnalyticsChartRange = persistAnalyticsChartRange
    }

    get persistAnalyticsChartRange() {
        return this._persistAnalyticsChartRange
    }

    setTheme(theme) {
        this._theme = theme
    }

    get theme() {
        return this._theme
    }

}
