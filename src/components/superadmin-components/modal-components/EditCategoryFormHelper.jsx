import React from 'react';
import { sendData } from "../../../App";
import MyToast from '../MyToast';
import ListGroupItem from './ListGroupItem';

function EditCategoryFormHelper(props) {

    const [category, setCategory] = React.useState(props.category.name);
    const [show, setShow] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);


    React.useEffect(() => {
        const request = async () => {
            const response = await fetch('/items');
            const json = await response.json();
            setItems(json.items);
            console.log(json);
        };
        request();
    }, []);

    React.useEffect(() => {
        setSelectedItems(
            items.filter((item) => {
                return item.category.includes(category);
            }).map((item) => {
                return item.name;
            })
        );
    }, [items, category]);



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
        sendData("/edit-category", {
            key: props.category._id,
            name: category,
            selectedItems: selectedItems
        });
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
                    <h1 className="fw-bold login-title">Edit Category</h1>
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
                    items.filter((item) => {
                        return item.name.toLowerCase().includes(search.toLowerCase());
                    }).sort().map((item, index) => {
                        return <ListGroupItem key={index} text={item.name} checked={selectedItems.includes(item.name)} onChange={handleChange} />;
                    })
                }
            </div>
            <button className="login-button hoverable" type="button" onClick={handleClick}>Save</button>
            <MyToast msg="Category edited successfully!" show={show} />
        </form>
    );
}

export default EditCategoryFormHelper;