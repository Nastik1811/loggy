export const formTemplate = `
            <h1 class="title">LOGGY</h1>
            <span class="caption">Login however you want!</span>
            <div class="controls-container">
                <div class="control"> 
                    <input id="email-ctrl" class="radio" type="radio" value="email" name="auth-methods" checked/>
                    <label for='email-ctrl'>EMAIL</label>
                </div>
                <div class="control">
                    <input id="phone-ctrl" class="radio" type="radio" value="phone" name="auth-methods" />
                    <label for='phone-ctrl'>PHONE</label>
                </div>
                <div class="control">
                    <input id="google-ctrl" class="radio" type="radio" value="google" name="auth-methods" />
                    <label for='google-ctrl'>GOOGLE</label>
                </div>
            </div>
            <div id="email-strategy" class="auth-strategy">
                <label class="label">
                    Email
                    <span id="email-error" class="error-message">
                    </span>
                    <input id="email" class='input' type='email' placeholder='test@test.com' name='email' />
                </label>
                <label class="label">
                    Password
                    <span id="password-error" class="error-message"></span>
                    <input 
                        id="password" 
                        class='input'
                        type='password'
                        placeholder='*********'
                        name='password'
                    />
                </label>
            </div>
            <div id="phone-strategy" class="auth-strategy hidden">
                <label class="label">
                    Phone
                    <span id="phone-error" class="error-message">
                    </span>
                    <input id="phone" class='input' type='tel' placeholder='+375290000000' name='phone' />
                </label>
                <label class="label">
                    Code
                    <span id="code-error" class="error-message">
                    </span>
                    <input id="code" class='input' type='text' placeholder='123456' name='code' />
                </label>
                <div id='recaptcha'></div>
            </div>
            <div id="google-strategy" class="auth-strategy hidden">
                <span class="text-center">
                    You will be redirected to the google sign up
                </span>
            </div>
            <button id="signin-btn" class="btn">Sign In</button>
`

export const privateContentTemplate = `
<div class="container">
    <h1 class="title">
        Congratulations!
    </h1>
    <div id="login-details">
    </div>
    <button id="signout-btn" class="btn">Sign Out</button>
</div>
`
