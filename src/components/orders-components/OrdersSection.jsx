import React from "react";
import Loading from "../Loading";
import { Capitalize } from "react-lodash";
import { baseURL } from "../../App";

function OrdersSection() {
    const [orders, setOrders] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch(baseURL + "/orders")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setOrders(data.orders);
                    console.log(data.orders.reverse());
                },
                (error) => {
                    setIsLoaded(true);
                }
            );
    }, []);

    if (!isLoaded) {
        return <Loading />;
    }

    return (
        <section id="orders">
            <div className="list-group">
                {orders.length === 0 ? (
                    <div className="m-5 p-5 text-center text-danger">
                        <h2>Order something first!</h2>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-danger fw-semibold mb-3">Orders</h1>
                        {orders.map((order) => {
                            return (
                                <form
                                    action={"/item/" + order.item._id}
                                    method="post"
                                >
                                    <button
                                        style={{ borderRadius: "20px" }}
                                        className="list-group-item list-group-item-action item-list-item mb-3"
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-lg-3 col-md-12 text-center">
                                                <img
                                                    src={order.item.img}
                                                    alt="item-pic"
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-12 pt-2 orders-item-details">
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
                                            </div>
                                            <div className="col-lg-2 col-md-12">
                                                <h2 className="fs-2 text-center align-middle">
                                                    <i className="fa-solid fa-indian-rupee-sign fs-4 me-1"></i>{" "}
                                                    {order.item.price *
                                                        order.quantity}
                                                    .00
                                                </h2>
                                            </div>
                                            <div className="col-lg-3 col-md-12 text-center">
                                                {order.status ===
                                                "processing" ? (
                                                    <h3>
                                                        <i class="fa-solid fa-circle fs-5 text-warning"></i>{" "}
                                                        <Capitalize
                                                            string={
                                                                order.status
                                                            }
                                                        />
                                                    </h3>
                                                ) : order.status ===
                                                  "approved" ? (
                                                    <h3>
                                                        <i class="fa-solid fa-circle fs-5 text-success"></i>{" "}
                                                        <Capitalize
                                                            string={
                                                                order.status
                                                            }
                                                        />
                                                    </h3>
                                                ) : (
                                                    <h3>
                                                        <i class="fa-solid fa-circle fs-5 text-danger"></i>{" "}
                                                        <Capitalize
                                                            string={
                                                                order.status
                                                            }
                                                        />
                                                    </h3>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                </form>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default OrdersSection;
