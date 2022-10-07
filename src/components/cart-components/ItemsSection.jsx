import React from "react";
import { baseURL, sendData } from "../../App";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import EmptyCart from "./EmptyCart";

function ItemsSection() {
    const [cart, setCart] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch(baseURL + "/user")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setCart(data.user.cart);
                    console.log(data.user.cart);
                },
                (error) => {
                    setIsLoaded(true);
                }
            );
    }, []);

    console.log(cart);

    if (!isLoaded) {
        return <Loading />;
    }

    function removeItem(event) {
        const name = event.target.name;
        sendData(baseURL + "/remove-item-from-cart", {
            id: name,
        });
        setCart((prev) => {
            return prev.filter((order) => {
                return order._id !== name;
            });
        });
    }

    function handleClick() {
        sendData(baseURL + "/place-orders", {
            cart: cart,
        });
    }

    function increaseQty(event) {
        const { id } = event.target;
        sendData(baseURL + "/cart/inc", {
            id: id,
        });
        reload();
    }

    function decreaseQty(event) {
        const { id } = event.target;
        sendData(baseURL + "/cart/dec", {
            id: id,
        });
        reload();
    }

    function reload() {
        window.location.reload();
    }

    if (cart.length === 0) {
        return <EmptyCart />;
    }

    return (
        <section style={{ overflow: "hidden" }} id="cart">
            <h1 className="text-danger fw-semibold m-5 my-3">Cart</h1>
            <div className="row mb-5 mt-0">
                <div style={{ padding: "0" }} className="col-lg-8 col-md-12 px-3">
                    <div className="list-group">
                        {cart.map((order, index) => {
                            return (
                                <div key={index}>
                                    <div
                                        style={{ borderRadius: "20px" }}
                                        className="list-group-item mb-3 list-group-item-action item-list-item"
                                    >
                                        <div className="row">
                                            <div className="col-lg-3 text-center">
                                                <Link
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
                                            <div className="col-lg-6 cart-item-details">
                                                <Link
                                                    className="text-dark"
                                                    to={
                                                        "/item/" +
                                                        order.item._id
                                                    }
                                                >
                                                    <h3>{order.item.name}</h3>
                                                    <p>
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
                                                    <h2 className="mt-2 fs-1 mb-0">
                                                        <i className="fa-solid fa-indian-rupee-sign fs-5 me-1"></i>{" "}
                                                        {order.item.price}.00{" "}
                                                        <span className="fs-6 text-secondary text-decoration-line-through">
                                                            999
                                                        </span>{" "}
                                                        <span className="fs-5 fw-semibold text-danger">
                                                            45% off
                                                        </span>
                                                    </h2>
                                                </Link>
                                            </div>
                                            <div className="col-lg-3 text-center">
                                                <h3 className="fw-semibold text-danger my-4">
                                                    <span>
                                                        <i
                                                            onClick={
                                                                increaseQty
                                                            }
                                                            id={order._id}
                                                            className="me-3 fa-solid fa-circle-plus"
                                                        ></i>{" "}
                                                        <input
                                                            disabled={true}
                                                            value={
                                                                order.quantity
                                                            }
                                                            className="fs-4 p-2"
                                                            style={{
                                                                width: "70px",
                                                                borderRadius:
                                                                    "10px",
                                                            }}
                                                            type="number"
                                                        />{" "}
                                                        <i
                                                            id={order._id}
                                                            onClick={
                                                                decreaseQty
                                                            }
                                                            className="ms-3 fa-solid fa-circle-minus"
                                                        ></i>
                                                    </span>
                                                </h3>
                                                <button
                                                    name={order._id}
                                                    onClick={removeItem}
                                                    className="btn btn-danger fw-semibold w-75 h-25 my-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="list-group">
                        <div
                            className="list-group-item cart-amounts"
                            style={{ borderRadius: "20px" }}
                        >
                            <div className="row">
                                <div className="col">
                                    <h5 className="my-3">
                                        Price(
                                        {cart.reduce(
                                            (total, order) =>
                                                total + order.quantity,
                                            0
                                        )}{" "}
                                        items)
                                    </h5>
                                    <h5 className="my-3">Delivery</h5>
                                    <h5 className="my-3">Convenience Fee</h5>
                                    <h5 className="my-5">Total Amount</h5>
                                </div>
                                <div className="col text-end">
                                    <h5 className="my-3">
                                        <i className="fa-solid fa-indian-rupee-sign fs-6 me-1"></i>{" "}
                                        {cart.reduce(
                                            (total, order) =>
                                                total +
                                                order.item.price *
                                                    order.quantity,
                                            0
                                        )}
                                        .00
                                    </h5>
                                    <h5 className="my-3">
                                        <i className="fa-solid fa-indian-rupee-sign fs-6 me-1"></i>{" "}
                                        0.00
                                    </h5>
                                    <h5 className="my-3">
                                        <i className="fa-solid fa-indian-rupee-sign fs-6 me-1"></i>{" "}
                                        49.00
                                    </h5>
                                    <h5 className="my-5">
                                        <i className="fa-solid fa-indian-rupee-sign fs-6 me-1"></i>{" "}
                                        {cart.reduce(
                                            (total, order) =>
                                                total +
                                                order.item.price *
                                                    order.quantity,
                                            0
                                        ) + 49}
                                        .00
                                    </h5>
                                </div>
                            </div>
                            <Link className="text-white" to="/order-success">
                                <button
                                    onClick={handleClick}
                                    className="btn btn-danger fw-semibold"
                                >
                                    <i className="me-3 fa-solid fa-bolt"></i>{" "}
                                    Place Order
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ItemsSection;
