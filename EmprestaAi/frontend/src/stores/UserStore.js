import { extendObservable } from 'mobx'

/**
 * UserStore
 */
class UserStore {
    constructor () {
        extendObservable(this, {

            loading:true,
            isLoggedIn: false,
            cadastrar: false,
            username: '',
            email: ''


        })
    }
}

export default new UserStore();