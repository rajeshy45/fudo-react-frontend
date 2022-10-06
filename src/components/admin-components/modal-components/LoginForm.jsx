import React from "react";

function LoginForm(props) {
    return (
        <form action={"/" + props.id + "/login"} method="post">
            <div className="row">
                <div className="col">
                    <h1 className="fw-bold login-title">Log in</h1>
                </div>
                <div className="col text-end">
                    <i
                        className="fa-solid fa-circle-xmark close"
                        data-bs-dismiss="modal"
                    ></i>
                </div>
            </div>
            <input
                name="username"
                type="text"
                className="input-number"
                placeholder="User ID"
            />
            <input
                name="password"
                type="password"
                className="input-number"
                placeholder="Password"
            />
            <button className="login-button hoverable" type="submit">
                Log In
            </button>
        </form>
    );
}

export default LoginForm;
