import React from 'react';
import { baseURL } from '../../../App';

function SignupForm() {
    return (
        <form action={baseURL + '/user/signup'} method='post'>
            <div className="row">
                <div className="col">
                    <h1 className="fw-bold login-title">Sign up</h1>
                </div>
                <div className="col text-end">
                    <i className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <input name="fname" type="text" className="input-number" placeholder="First Name" />
            <input name="lname" type="text" className="input-number" placeholder="Last Name" />
            <input name="username" type="email" className="input-number" placeholder="Email" />
            <input name="password" type="password" className="input-number" placeholder="Password" />

            <button className="login-button hoverable" type="submit">Sign Up</button>

            <p className="or">or</p>

            <button className="login-button hoverable" type="none">
                <i className="fa-brands fa-google icons"></i>
                Continue with Google
            </button>

            <button className="login-button hoverable" type="none">
                <i className="fa-solid fa-phone icons"></i>
                Continue with Phone Number
            </button>

            <p className="new-acc-text">Already have an account? <a href="/" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a></p>
        </form>
    );
}

export default SignupForm;