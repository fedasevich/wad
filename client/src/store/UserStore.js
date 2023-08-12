import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    logOut() {
        this._isAuth = false
        this._user = {}
        localStorage.removeItem('token')
    }
}