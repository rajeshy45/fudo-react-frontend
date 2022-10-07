import React from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../App";
import Loading from "../Loading";
import EmptyMenu from "./EmptyMenu";

function ItemsSection(props) {
    const { category } = useParams();

    const [categories, setCategories] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [checkedCategories, setCheckedCategories] = React.useState(
        category ? [category] : []
    );

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/categories");
            const json = await response.json();
            setIsLoaded(true);
            setCategories(json.categories);
            console.log(json);
        };
        request();
    }, []);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/items");
            const json = await response.json();
            setIsLoaded(true);
            setItems(json.items);
            console.log(json);
        };
        request();
    }, []);

    function handleCheck(event) {
        const { value, checked } = event.target;

        if (checked) {
            setCheckedCategories((prev) => {
                return [...prev, value];
            });
        } else {
            setCheckedCategories((prev) => {
                return prev.filter((category) => {
                    return category !== value;
                });
            });
        }
    }

    const titleTextStyle = {
        margin: "0.25em",
        fontWeight: "bold",
        textAlign: "center",
        color: "#FF4646",
    };

    if (!isLoaded) {
        return <Loading />;
    }

    const filteredItems = items
        .filter((item) => {
            return (
                item.category.filter((value) =>
                    checkedCategories.includes(value)
                ).length !== 0 || checkedCategories.length === 0
            );
        })
        .filter((item) => {
            return item.name.toLowerCase().includes(props.search.toLowerCase());
        });

    return (
        <section>
            <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <h1 style={titleTextStyle} className="fs-3">
                        Categories
                    </h1>
                    <div className="list-group">
                        {categories
                            .filter((category) => {
                                return category.name !== "All";
                            })
                            .map((category, index) => {
                                return (
                                    <label
                                        key={index}
                                        className="list-group-item category-item"
                                    >
                                        <input
                                            onChange={handleCheck}
                                            checked={checkedCategories.includes(
                                                category.name
                                            )}
                                            className="form-check-input me-3"
                                            type="checkbox"
                                            value={category.name}
                                        />
                                        {category.name}
                                    </label>
                                );
                            })}
                    </div>
                </div>
                <div style={{ padding: "0" }} className="col-lg-8 col-md-12 col-sm-12">
                    <h1 style={titleTextStyle} className="fs-3">
                        Items
                    </h1>
                    <div className="list-group">
                        <div className="row">
                            {filteredItems.length !== 0 ? (
                                filteredItems.map((item, index) => {
                                    return (
                                        <form
                                            key={index}
                                            action={"/item/" + item._id}
                                            method="post"
                                            style={{ borderRadius: "20px" }}
                                            className="mb-3"
                                        >
                                            <button
                                                type="submit"
                                                className="list-group-item list-group-item-action item-list-item"
                                            >
                                                <div className="row">
                                                    <div className="col-lg-5 col-md-12 col-sm-12 text-center">
                                                        <img
                                                            src={item.img}
                                                            alt="item-pic"
                                                        />
                                                    </div>
                                                    <div className="col-lg-7 col-md-12 col-sm-12 p-3 item-details">
                                                        <h3>{item.name}</h3>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                        <span className="rating">
                                                            5.0{" "}
                                                            <i className="fa-solid fa-star"></i>
                                                        </span>
                                                        <h2 className="mt-3">
                                                            <i className="fa-solid fa-indian-rupee-sign fs-4 me-1"></i>{" "}
                                                            {item.price}.00
                                                        </h2>
                                                    </div>
                                                </div>
                                            </button>
                                        </form>
                                    );
                                })
                            ) : (
                                <EmptyMenu />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ItemsSection;
