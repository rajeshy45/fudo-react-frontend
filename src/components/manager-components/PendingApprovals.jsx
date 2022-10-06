import React from "react";
import { sendData } from "../../App";
import Loading from "../Loading";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function PendingApprovals() {
    const [orders, setOrders] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch("/all-orders")
            .then((res) => res.json())
            .then(
                (data) => {
                    setOrders(data.orders);
                },
                (error) => {
                    setIsLoaded(true);
                }
            );
    }, []);

    
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch("/auth/manager");
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
        return <Navigate to="/managerlogin" />;
    }


    const pendingOrders = orders.filter((order) => {
        return order.status === "processing";
    });

    function reload() {
        window.location.reload();
    }

    function approveOrder(event) {
        const id = event.target.id;

        sendData("/approve-order", {
            id: id,
        });

        reload();
    }

    function rejectOrder(event) {
        const id = event.target.id;

        sendData("/reject-order", {
            id: id,
        });

        reload();
    }

    return (
        <section>
            <NavBar />

            <div className="mx-5 my-3 px-5">
                <div className="list-group">
                    {pendingOrders.length === 0 ? (
                        <div className="m-5 p-5 text-center text-danger">
                            <h2>No Pending Orders!</h2>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-danger fw-semibold mb-3">
                                Pending Approvals
                            </h1>
                            {pendingOrders.map((order) => {
                                return (
                                    <button
                                        style={{ borderRadius: "20px" }}
                                        className="list-group-item list-group-item-action item-list-item mb-3"
                                    >
                                        <div className="row align-items-center">
                                            <div className="col col-3 text-center">
                                                <Link
                                                    className="text-dark"
                                                    to={
                                                        "/item/" +
                                                        order.item._id
                                                    }
                                                >
                                                    <img
                                                        src={order.item.img}
                                                        alt="item-pic"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="col col-4 py-4 orders-item-details">
                                                <Link
                                                    className="text-dark"
                                                    to={
                                                        "/item/" +
                                                        order.item._id
                                                    }
                                                >
                                                    <h2>{order.item.name}</h2>
                                                    <p className="my-3">
                                                        {order.item.description}
                                                    </p>
                                                    <p className="fs-6 mt-2">
                                                        <span className="rating me-3">
                                                            5.0{" "}
                                                            <i className="fa-solid fa-star"></i>
                                                        </span>{" "}
                                                        290702 Ratings & 41002
                                                        Reviews
                                                    </p>
                                                    <p>Qty: {order.quantity}</p>
                                                </Link>
                                            </div>
                                            <div className="col col-2">
                                                <Link
                                                    className="text-dark"
                                                    to={
                                                        "/item/" +
                                                        order.item._id
                                                    }
                                                >
                                                    <h2 className="my-5 fs-2 text-center align-middle">
                                                        <i className="fa-solid fa-indian-rupee-sign fs-4 me-1"></i>{" "}
                                                        {order.item.price *
                                                            order.quantity}
                                                        .00
                                                    </h2>
                                                </Link>
                                            </div>
                                            <div className="col col-3 text-center">
                                                <div>
                                                    <button
                                                        id={order._id}
                                                        onClick={approveOrder}
                                                        className="btn btn-success p-3 fw-semibold fs-5 m-3 w-50"
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        id={order._id}
                                                        onClick={rejectOrder}
                                                        className="btn btn-danger p-3 fw-semibold fs-5 m-3 w-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default PendingApprovals;
