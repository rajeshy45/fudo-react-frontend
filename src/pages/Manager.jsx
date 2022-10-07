import React from "react";
import NavBar from "../components/manager-components/NavBar";
import SettingCard from "../components/manager-components/SettingCard";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";
import { baseURL } from "../App";

function Manager() {
    const [orders, setOrders] = React.useState({});
    const [itemCount, setItemCount] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isAuthLoaded, setIsAuthLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch(baseURL + "/all-orders")
            .then((res) => res.json())
            .then(
                (data) => {
                    setOrders(data.orders.reverse());
                }
            );
    }, []);

    React.useEffect(() => {
        fetch(baseURL + "/items")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setItemCount(data.items.length);
                }
            );
    }, []);

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/auth/manager");
            const json = await response.json();
            setIsAuthLoaded(true);
            setIsAuthenticated(json.isAuthenticated);
            console.log(json);
        };

        request();
    });

    if (!isLoaded || !isAuthLoaded) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/managerlogin" />;
    }

    let pendingCount = 0;
    let approvedCount = 0;
    let declinedCount = 0;
    orders.forEach((order) => {
        if (order.status === "approved") {
            approvedCount += 1;
        } else if (order.status === "rejected") {
            declinedCount += 1;
        } else {
            pendingCount += 1;
        }
    });

    return (
        <div id="manager-div">
            <NavBar links={{ text: "Logout", href: "/manager/logout" }} />
            <div style={{ margin: "0 5%" }} className="row">
                <SettingCard
                    title="Pending Approvals"
                    img="/images/pending-approval.png"
                    url="/manager/pending-approvals"
                    badgeValue={pendingCount}
                />
                <SettingCard
                    title="Approved Orders"
                    img="/images/approved.png"
                    url="/manager/approved-orders"
                    badgeValue={approvedCount}
                />
                <SettingCard
                    title="Declined Orders"
                    img="/images/delete.png"
                    url="/manager/declined-orders"
                    badgeValue={declinedCount}
                />
                <SettingCard
                    title="All Orders"
                    img="/images/orders.png"
                    url="/manager/all-orders"
                    badgeValue={orders.length}
                />
                <SettingCard
                    title="All Items"
                    img="/images/items.png"
                    url="/menu"
                    badgeValue={itemCount}
                />
                <SettingCard
                    title="Edit Profile"
                    img="/images/gg_profile.png"
                    url="/manager"
                    badgeValue={null}
                />
            </div>
        </div>
    );
}

export default Manager;
