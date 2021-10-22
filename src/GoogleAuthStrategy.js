import AuthStrategy from "./AuthStrategy"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

const provider = new GoogleAuthProvider()

export default class GoogleAuthStrategy extends AuthStrategy{
    async signin() {
        const auth = getAuth()
        return signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            return {user: result.user, token: credential.accessToken}
        }).catch((error) => {
            throw {code: error.code, message: error.message, email: error.email}
        })
    }
}
