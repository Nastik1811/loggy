import { getAuth, signOut, onAuthStateChanged, AuthErrorCodes} from "@firebase/auth"

const { default: EmailAuthStrategy } = require("./EmailAuthStrategy")
const { default: GoogleAuthStrategy } = require("./GoogleAuthStrategy")
const { default: PhoneAuthStrategy } = require("./PhoneAuthStrategy")

export const availableStrategies = {
    EMAIL: 'email',
    PHONE: 'phone',
    GOOGLE: 'google'
}

export default class AuthManager {
    constructor() {
        this.strategy = new EmailAuthStrategy()
        this.strategyName = availableStrategies.EMAIL
    }

    onAuthStateChanged(observer) {
        onAuthStateChanged(getAuth(), observer)
    }

    setAuthStrategy(strategy) {
        switch(strategy) {
            case availableStrategies.EMAIL:
                this.strategy = new EmailAuthStrategy()
                break
            case availableStrategies.PHONE:
                this.strategy = new PhoneAuthStrategy()
                break
            case availableStrategies.GOOGLE:
                this.strategy = new GoogleAuthStrategy()
                break
            default: 
                throw new Error('Invalid authentication strategy')
        }
        this.strategyName = strategy
    }

    get paramsList() {
        return this.strategy.paramsList
    }

    async signin(params) {
        return this.strategy.signin(params).catch(error => this.handleError(error))
    }

    handleError(error) {
        switch(error.code) {
            case AuthErrorCodes.INVALID_EMAIL:
               throw {message: 'User not found', param: 'email'}
            case AuthErrorCodes.INVALID_PASSWORD:
                throw {message: 'Wrong password', param: 'password'}
            case AuthErrorCodes.INVALID_PHONE_NUMBER:
                throw {message: 'Invalid format', param: 'phone'}
            case AuthErrorCodes.INVALID_CODE:
                throw {message: 'Wrong code', param: 'code'}
            default:
                throw {message: 'Unknow error! Please, try later'}
        }
    }

    async signout() {
        return signOut(getAuth())
    }

    getAuth() {
        return getAuth()
    }
}
