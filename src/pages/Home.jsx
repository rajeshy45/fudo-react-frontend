import React from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from ".././components/home-components/NavBar";
import MainSection from '../components/home-components/MainSection';
import MenuSection from '../components/home-components/MenuSection';
import Loading from '../components/Loading';
import FooterSection from '../components/root-components/FooterSection';

function Home() {

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

    if (!isLoaded) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div id="home-div">
            <NavBar links={navBarLinks} />
            <MainSection />
            <MenuSection />
            <FooterSection />
        </div>
    );
}

export default Home;