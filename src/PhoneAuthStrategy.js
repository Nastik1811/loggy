import AuthStrategy from "./AuthStrategy"
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"

const paramsList = ['phone']
const testCode = '123456'

export default class PhoneAuthStrategy extends AuthStrategy{
    constructor() {
        super(paramsList)
    }

    async signin({phone}) {
        const auth = getAuth()
        auth.settings.appVerificationDisabledForTesting = true
        const appVerifier = new RecaptchaVerifier('recaptcha', {}, auth)
        return signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                return {user: confirmationResult.confirm(testCode).user}
            }).catch((error) => {
                throw {code: error.code, message: error.message}
            })
    }
}
