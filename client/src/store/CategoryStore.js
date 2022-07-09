import {makeAutoObservable} from "mobx";

export default class CategoryStore {
    constructor() {
        this._categories = [
            {id: 1, name: 'Groceries', spent: 0},
            {id: 2, name: 'Oil', spent: 100},
            {id: 3, name: "Health", spent: 500}
        ]
        this._transactions = [
            {id: 1, name: 'Groceries', spent: 0},
            {id: 2, name: 'Oil', spent: 100},
            {id: 3, name: "Health", spent: 500}
        ]
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get sAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

}