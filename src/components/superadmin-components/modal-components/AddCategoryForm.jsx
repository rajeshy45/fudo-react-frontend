import React from 'react';
import { sendData } from "../../../App";
import MyToast from '../MyToast';
import ListGroupItem from './ListGroupItem';

function AddCategoryForm() {

    const [category, setCategory] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [items, setItems] = React.useState([]);


    function GetItems() {
        React.useEffect(() => {
            const request = async () => {
                const response = await fetch('/items');
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

    function handleClick() {
        sendData("/add-category", {
            name: category,
            selectedItems: selectedItems
        });
        setCategory("");
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
                    <h1 className="fw-bold login-title">Add Category</h1>
                </div>
                <div className="col text-end">
                    <i onClick={reload} className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <input value={category} onChange={handleInput} name="category" placeholder='Category Name' type="text" className="input-number" />
            <h5 style={{ padding: "10px 0", color: "#FD4B4B" }}>Add Items to Category</h5>
            <input value={search} onChange={handleInput} name="search" placeholder='Search Items' type="text" className="input-number" />
            <div className="list-group">
                {
                    GetItems().filter((item) => {
                        return item.name.toLowerCase().includes(search.toLowerCase());
                    }).sort((a, b) => {
                        return a.name.toLowerCase() < b.name.toLowerCase();
                    }).map((item, index) => {
                        return <ListGroupItem key={index} text={item.name} checked={selectedItems.includes(item.name)} onChange={handleChange} />;
                    })
                }
            </div>
            <button className="login-button hoverable" type="button" onClick={handleClick}>Save</button>
            <MyToast msg="Category saved successfully!" show={show} />
        </form>
    );
}

export default AddCategoryForm;