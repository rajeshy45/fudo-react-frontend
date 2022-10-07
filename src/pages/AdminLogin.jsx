import React from 'react';
import Modal from '../components/admin-components/Modal';
import LoginForm from '../components/admin-components/modal-components/LoginForm';
import SignupForm from '../components/admin-components/modal-components/SignupForm';
import Loading from '../components/Loading';
import { Navigate } from "react-router-dom";
import { baseURL } from '../App';

function AdminLogin(props) {

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "100px 0"
    };

    const imgStyle = {
        borderRadius: "20px"
    };

    const btnDivStyle = {
        textAlign: "center",
        height: "280px"
    };

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/auth/" + props.id);
            const json = await response.json();
            setIsLoaded(true);
            setIsAuthenticated(json.isAuthenticated);
            console.log(json);
        };

        request();
    });

    if (!isLoaded) {
        return <Loading />;
    }

    if (isAuthenticated) {
        return <Navigate to={"/" + props.id} />;
    }

    return (
        <div>
            <Modal id="adminLoginModal" form={<LoginForm id={props.id} />} />
            <Modal id="adminSignupModal" form={<SignupForm id={props.id} />} />
            <div style={divStyle}>
                <img style={imgStyle} className="adminlogin-img" src="images/logo.png" alt="logo" />
                <h1 className="adminlogin-title" >Fudo</h1>
            </div>
            <div style={btnDivStyle}>
                <button className="btn btn-danger adminlogin-btn" data-bs-toggle="modal" data-bs-target="#adminLoginModal">Login</button>
                <br></br>
                <button className="btn btn-danger adminlogin-btn" data-bs-toggle="modal" data-bs-target="#adminSignupModal">Register</button>
            </div>
        </div>
    );
}

export default AdminLogin;