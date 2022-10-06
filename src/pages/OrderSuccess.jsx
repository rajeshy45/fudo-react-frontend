import React from 'react';
import NavBar from '../components/home-components/NavBar';
import { Link, Navigate } from "react-router-dom";
import Loading from '../components/Loading';
import FooterSection from '../components/root-components/FooterSection';

function OrderSuccess() {

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

        React.useEffect(() => {
            const request = async () => {
                const response = await fetch("/auth/user");
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

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }


    const navBarLinks = [
        {
            text: "Home",
            href: "/"
        },
        {
            text: "Menu",
            href: "/menu"
        }
    ];

    return (
        <div>
            <NavBar links={navBarLinks} />
            <div className='m-5 text-center text-danger'>
                <h1><i style={{ fontSize: "250px" }} className="fa-solid fa-circle-check"></i></h1>
                <h1 className="m-5">Order Placed!</h1>
                <Link className="text-white" to="/orders"><button className="btn btn-outline-danger fs-2 px-5 py-3">My Orders</button></Link>
            </div>
            <FooterSection />
        </div>
    );
}

export default OrderSuccess;