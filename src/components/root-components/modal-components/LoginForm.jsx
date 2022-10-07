import React from 'react';
import { baseURL } from '../../../App';

function LoginForm() {

    return (
        <form action={baseURL + '/user/login'} method='post'>
            <div className="row">
                <div className="col">
                    <h1 className="fw-bold login-title">Log in</h1>
                </div>
                <div className="col text-end">
                    <i className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <input name="username" type="email" className="input-number" placeholder="Email" />
            <input name="password" type="password" className="input-number" placeholder="Password" />
            <button className="login-button hoverable" type="submit">Log In</button>

            <p className="or">or</p>

            <button className="login-button hoverable" type="none">
                <i className="fa-brands fa-google icons"></i>
                Continue with Google
            </button>

            <button className="login-button hoverable" type="none">
                <i className="fa-solid fa-phone icons"></i>
                Continue with Phone Number
            </button>

            <p className="new-acc-text">New to Fudo? <a href="/" data-bs-toggle="modal" data-bs-target="#signupModal">Create Account</a></p>
        </form>
    );
}

export default LoginForm;