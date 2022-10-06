import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Manager from "./pages/Manager";
import SuperAdmin from "./pages/SuperAdmin";
import Menu from "./pages/Menu";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import AdminLogin from "./pages/AdminLogin";
import PendingApprovals from "./components/manager-components/PendingApprovals";
import ApprovedOrders from "./components/manager-components/ApprovedOrders";
import DeclinedOrders from "./components/manager-components/DeclinedOrders";
import AllOrders from "./components/manager-components/AllOrders";

function sendData(route, data) {
    fetch(route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}

function IsAuthenticated(person) {
    const [authenticated, setAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch("/auth/" + person);
            const json = await response.json();
            setAuthenticated(json.isAuthenticated);
            console.log(json);
        };

        request();
    });

    return authenticated;
}

function GetUser() {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch("/user");
            const json = await response.json();
            setUser(json.user);
            console.log(json);
        };

        request();
    }, []);

    return user;
}

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:searchString" element={<Menu />} />
                <Route path="/menu/c/:category" element={<Menu />} />
                <Route path="/item/:id" element={<Item />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/adminlogin" element={<AdminLogin id="superadmin" />} />
                <Route path="/managerlogin" element={<AdminLogin id="manager" />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/superadmin" element={<SuperAdmin />} />
                <Route path="/manager/pending-approvals" element={<PendingApprovals />} />
                <Route path="/manager/approved-orders" element={<ApprovedOrders />} />
                <Route path="/manager/declined-orders" element={<DeclinedOrders />} />
                <Route path="/manager/all-orders" element={<AllOrders />} />
            </Routes>
        </BrowserRouter>
    );
}

export { sendData, IsAuthenticated, GetUser };
export default App;
