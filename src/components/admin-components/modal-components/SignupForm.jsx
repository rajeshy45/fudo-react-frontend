import React from 'react';
import { baseURL } from '../../../App';

function SignupForm(props) {
    return (
        <form action={baseURL + "/" + props.id + "/signup"} method='post'>
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
            <input name="username" type="text" className="input-number" placeholder="User ID" />
            <input name="password" type="password" className="input-number" placeholder="Password" />

            <button className="login-button hoverable" type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;