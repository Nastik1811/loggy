import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import AuthStrategy from "./AuthStrategy"

const paramList = ['email', 'password']

export default class EmailAuthStrategy extends AuthStrategy{
    constructor() {
        super(paramList)
    }

    async signin({email, password}) {
        const auth = getAuth()
        return signInWithEmailAndPassword(auth, email, password).then((cred) => {
            return {user: cred.user}
        })
        .catch((error) => {
            throw {code: error.code, message: error.message}
        })
    }
}
