export default class AuthStrategy {
    constructor(paramsList = []) {
        this.paramsList = paramsList
    }

    async signin(params) {
        throw new Error('Sign in method should be implemented!')
    }

    static get paramsList() {
        return this.paramsList
    }
}
