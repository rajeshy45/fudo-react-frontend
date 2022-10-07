import React from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL, IsAuthenticated } from "../../App";
import { sendData } from "../../App";
import Loading from "../Loading";
import MyToast from "../superadmin-components/MyToast";

function ItemSection() {
    const { id } = useParams();

    const [item, setItem] = React.useState({});
    const [quantity, setQuantity] = React.useState(1);
    const [toast, setToast] = React.useState({
        msg: "",
        show: false,
    });
    const [isLoaded, setIsLoaded] = React.useState(false);

    const isAuthenticated = IsAuthenticated("user");

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/item/" + id);
            const json = await response.json();
            setIsLoaded(true);
            setItem(json.item);
            console.log(json);
        };
        request();
    }, [id]);

    function increaseQuantity() {
        setQuantity(Number(quantity) + 1);
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(Number(quantity) - 1);
        }
    }

    function handleChange(event) {
        const value = event.target.value;
        setQuantity(value);
    }

    function handleClick(event) {
        const name = event.target.name;

        const order = {
            item: item,
            quantity: Number(quantity),
        };

        if (name === "cart") {
            if (isAuthenticated) {
                sendData("/add-item-to-cart", order);
                setToast({
                    msg: "Item added to cart",
                    show: true,
                });
            } else {
                console.log(order);
                setToast({
                    msg: "Please login to continue!",
                    show: true,
                });
            }
        } else {
            if (isAuthenticated) {
                sendData("/place-order", order);
                setToast({
                    msg: "Order placed!",
                    show: true,
                });
            } else {
                console.log(order);
                setToast({
                    msg: "Please login to continue!",
                    show: true,
                });
            }
        }
    }

    if (!isLoaded) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <MyToast msg={toast.msg} show={toast.show} />
            <div className="row py-4">
                <div className="col-lg-5 col-md-12 col-sm-12" style={{textAlign: 'center'}}>
                    <img
                        className="shadow item-page-img"
                        src={item.img}
                        alt="item-pic"
                    />
                    <button
                        name="cart"
                        onClick={handleClick}
                        className="btn btn-danger fw-semibold item-page-btn"
                    >
                        <i class="fa-solid fa-bag-shopping me-3"></i>ADD TO CART
                    </button>
                    <button
                        name="order"
                        onClick={handleClick}
                        className="btn btn-danger fw-semibold item-page-btn"
                    >
                        {isAuthenticated ? (
                            <Link className="text-white" to="/order-success">
                                <i class="fa-solid fa-bolt me-3"></i>ORDER NOW
                            </Link>
                        ) : (
                            <Link className="text-white" to="">
                                <i class="fa-solid fa-bolt me-3"></i>ORDER NOW
                            </Link>
                        )}
                    </button>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12 item-page-details">
                    <h1>{item.name}</h1>
                    <p className="fs-6 my-4">
                        <span className="rating me-3">
                            5.0 <i className="fa-solid fa-star"></i>
                        </span>{" "}
                        290702 Ratings & 41002 Reviews
                    </p>
                    <h2 className="my-5 fs-1">
                        <i className="fa-solid fa-indian-rupee-sign fs-4 me-1"></i>{" "}
                        {item.price}.00{" "}
                        <span className="fs-6 text-secondary text-decoration-line-through">
                            999
                        </span>{" "}
                        <span className="fs-5 fw-semibold text-danger">
                            45% off
                        </span>
                    </h2>
                    <h3 className="fw-semibold text-danger">
                        Available Offers
                    </h3>
                    <h6 className="mt-3 text-secondary">
                        <img
                            className="mx-3"
                            src="/images/offer.png"
                            alt="offer-icon"
                        />
                        Bank Offer 10% off on SBI Credit Card upto 1500 rupees
                        and above{" "}
                        <span className="text-danger fs-6">T & C</span>
                    </h6>
                    <h6 className="mt-3 text-secondary">
                        <img
                            className="mx-3"
                            src="/images/offer.png"
                            alt="offer-icon"
                        />
                        Bank Offer 10% off on SBI Credit Card upto 1500 rupees
                        and above{" "}
                        <span className="text-danger fs-6">T & C</span>
                    </h6>
                    <h6 className="my-3 text-secondary">
                        <img
                            className="mx-3"
                            src="/images/offer.png"
                            alt="offer-icon"
                        />
                        Bank Offer 10% off on SBI Credit Card upto 1500 rupees
                        and above{" "}
                        <span className="text-danger fs-6">Know more*</span>
                    </h6>
                    <h3 className="fw-semibold text-danger my-5">
                        Quantity{" "}
                        <span>
                            <i
                                onClick={increaseQuantity}
                                className="ms-5 mx-3 fa-solid fa-circle-plus"
                            ></i>{" "}
                            <input
                                onChange={handleChange}
                                value={quantity}
                                className="fs-4 p-2"
                                style={{ width: "70px", borderRadius: "10px" }}
                                type="number"
                            />{" "}
                            <i
                                onClick={decreaseQuantity}
                                className="mx-3 fa-solid fa-circle-minus"
                            ></i>
                        </span>
                    </h3>
                    <h3 className="fw-semibold text-danger my-5">
                        Delivery{" "}
                        <input
                            className="p-2 ms-3 fs-6"
                            style={{
                                width: "250px",
                                border: "0",
                                borderBottom: "2px solid #FF4646",
                            }}
                            type="number"
                            placeholder="Enter the pincode"
                        />
                    </h3>
                    <h3 className="fw-semibold text-danger">Description</h3>
                    <p className="m-3 text-secondary">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ItemSection;
