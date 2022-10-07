import React from 'react';
import MyToast from '../MyToast';
import { baseURL, sendData } from "../../../App";
import ListGroupItem from './ListGroupItem';

function DeleteItemForm() {

    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState("All");
    const [search, setSearch] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [items, setItems] = React.useState([]);


    function GetItems() {
        React.useEffect(() => {
            const request = async () => {
                const response = await fetch(baseURL + '/items');
                const json = await response.json();
                setItems(json.items);
                console.log(json);
            };
            request();
        }, []);

        return items;
    }

    function handleInput(event) {
        setShow(false);

        const { name, value } = event.target;

        if (name === "category") {
            setCategory(value);
        } else {
            setSearch(value);
        }
    }

    function GetCategories() {
        React.useEffect(() => {
            const request = async () => {
                const response = await fetch(baseURL + '/categories');
                const json = await response.json();
                setCategories(json.categories);
                console.log(json);
            };
            request();
        }, []);

        return categories;
    }

    function handleSelect(event) {
        const value = event.target.innerHTML;
        setCategory(value);
    }

    function handleClick() {
        sendData(baseURL + "/delete-items", {
            selectedItems: selectedItems
        });
        setCategory("All");
        setSelectedItems([]);
        setShow(true);
    }

    function handleChange(event) {
        const { value, checked } = event.target;

        setSelectedItems((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return selectedItems.filter((item) => {
                    return value !== item;
                });
            }
        });
    }

    function reload() {
        window.location.reload();
    }

    return (
        <form>
            <div className="row">
                <div className="col col-8">
                    <h1 className="fw-bold login-title">Delete Items</h1>
                </div>
                <div className="col text-end">
                    <i onClick={reload} className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <h5 style={{ padding: "10px 0", color: "#FD4B4B" }}>Select items to delete</h5>
            <div className="input-group mb-3">
                <input value={search} onChange={handleInput} name="name" placeholder='Search Items' type="text" className="form-control ig-input ig-span-left" />
                <button className="btn btn-outline-secondary dropdown-toggle ig-span-right" type="button" data-bs-toggle="dropdown">{category}</button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {
                        GetCategories().map((category, index) => {
                            return <li name="dd-item" className="dropdown-item" key={index} onClick={handleSelect}>{category.name}</li>;
                        })
                    }
                </ul>
            </div>
            <div className="list-group">
                {
                    GetItems().filter((item) => {
                        return (item.category.includes(category) && item.name.toLowerCase().includes(search.toLowerCase()));
                    }).sort().map((item, index) => {
                        return <ListGroupItem key={index} text={item.name} checked={selectedItems.includes(item.name)} onChange={handleChange} />;
                    })
                }
            </div>
            <button className="login-button hoverable" type="button" onClick={handleClick}>Save</button>
            <MyToast msg="Items deleted successfully!" show={show} />
        </form>
    );
}

export default DeleteItemForm;