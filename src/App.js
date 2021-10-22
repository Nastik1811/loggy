import { initializeApp } from "firebase/app"
import AuthManager, {availableStrategies} from './AuthManager'
import { formTemplate, privateContentTemplate } from "./templates"

const firebaseConfig = {
    apiKey: "AIzaSyAMgw8NnHu8XzfEKJlOs3KtN8SAhGitr6Y",
    authDomain: "loggy-001.firebaseapp.com",
    projectId: "loggy-001",
    storageBucket: "loggy-001.appspot.com",
    messagingSenderId: "179774893337",
    appId: "1:179774893337:web:fa49585979248b4e586988"
  }

export default class App {
    constructor(rootId) {
        this.rootId = rootId
        this.authState = null
        this.authManager = null
        this.availableStrategies = Object.values(availableStrategies)
        this.init()
    }
    
    init() {
        initializeApp(firebaseConfig)
        this.authManager = new AuthManager()
        this.authManager.setAuthStrategy(availableStrategies.EMAIL)
        this.authManager.onAuthStateChanged(auth => this.setAuthState(auth))
    }

    setAuthState(auth) {
        this.authState = auth
        this.render()
    }

    signin(form) {
        const params = {}
        this.authManager.paramsList.forEach(p => {
            params[p] = form.elements[p].value
        })
        this.authManager.signin(params).catch(error => alert(error.message))
    }

    signout() {
        this.authManager.signout()
        this.authManager.setAuthStrategy(availableStrategies.EMAIL)
    }

    // showLoginError(error) {
    //     if(error.param) {
    //         const field = this.$form.querySelector(`#${error.param}`)
    //         this.$form.querySelector(`#${error.param}-error`).innerText = error.message
    //         field.classList.add('error')
    //     }
    // }

    showStrategy(strategy) {
        this.$form.querySelectorAll('.auth-strategy').forEach($strategy => {
            if($strategy.id === `${strategy}-strategy`) {
                $strategy.classList.remove('hidden')
            } else {
                $strategy.classList.add('hidden')
            }
        })
    }

    renderAuthForm() {
        const $form = document.createElement('form')
        $form.innerHTML = formTemplate
        $form.className = 'auth-form'

        $form.addEventListener('submit', (event) => {
                event.preventDefault()
                this.signin(event.target)
             })

        const $controlsContainer = $form.querySelector('.controls-container')
        $controlsContainer.addEventListener('change', event => {
            this.authManager.setAuthStrategy(event.target.value)
            this.showStrategy(event.target.value)
        })

        if(this.$content) {
            this.$content.replaceWith($form)
        } else {
            document.querySelector(this.rootId).append($form)
        }
        this.$form = $form
    }

    renderPrivateContent() {
        const $content = document.createElement('div')
        $content.innerHTML = privateContentTemplate
        $content.classList.add('content')

        const $signOut = $content.querySelector('#signout-btn')
        $signOut.addEventListener('click', () => {
            this.signout()
        })
        
        const $loginDetatils = $content.querySelector('#login-details')
        $loginDetatils.innerHTML = `
            You've been successfully logged in via ${this.authManager.strategyName}!
        `
        if(this.$form) {
            this.$form.replaceWith($content)
        } else {
            document.querySelector(this.rootId).append($content)
        }
        this.$content = $content
    }

    render() {
        if(!this.authState) {
            this.renderAuthForm()
        } else {
            this.renderPrivateContent()
        }
    }
}
