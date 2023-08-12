import { createContext, useContext } from "react"
import CategoryStore from "./CategoryStore"
import UserSettingsStore from "./UserSettingsStore"
import UserStore from "./UserStore"
import WalletStore from "./WalletStore"

export class RootStore {
    constructor() {
        this.userSettings = new UserSettingsStore(this)
        this.user = new UserStore(this)
        this.category = new CategoryStore(this)
        this.wallet = new WalletStore(this)
    }
}

const rootStoreInstance = new RootStore();

export const StoreContext = createContext({
    user: rootStoreInstance.user,
    category: rootStoreInstance.category,
    wallet: rootStoreInstance.wallet,
    userSettings: rootStoreInstance.userSettings
})

export const useStore = () => useContext(StoreContext)