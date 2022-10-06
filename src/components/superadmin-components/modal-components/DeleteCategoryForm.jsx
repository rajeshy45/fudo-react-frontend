import React from 'react';
import MyToast from '../MyToast';
import { sendData } from "../../../App";
import ListGroupItem from './ListGroupItem';

function DeleteCategoryForm() {

    const [categories, setCategories] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [selectedCategories, setSelectedCategories] = React.useState([]);

    function handleInput(event) {
        setShow(false);

        const value = event.target.value;

        setSearch(value);
    }

    function GetCategories() {
        React.useEffect(() => {
            const request = async () => {
                const response = await fetch('/categories');
                const json = await response.json();
                setCategories(json.categories);
                console.log(json);
            };
            request();
        }, []);

        return categories;
    }

    function handleClick() {
        sendData("/delete-categories", {
            selectedCategories: selectedCategories
        });
        setSearch("");
        setSelectedCategories([]);
        setShow(true);
    }

    function handleChange(event) {
        const { value, checked } = event.target;

        setSelectedCategories((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return selectedCategories.filter((item) => {
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
                    <h1 className="fw-bold login-title">Delete Categories</h1>
                </div>
                <div className="col text-end">
                    <i onClick={reload} className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <h5 style={{ padding: "10px 0", color: "#FD4B4B" }}>Select categories to delete</h5>
            <div className="input-group mb-3">
                <input value={search} onChange={handleInput} name="name" placeholder='Search Items' type="text" className="input-number" />
            </div>
            <div className="list-group">
                {
                    GetCategories().filter((category) => {
                        return (category.name.toLowerCase().includes(search.toLowerCase()));
                    }).sort().map((category, index) => {
                        return <ListGroupItem key={index} text={category.name} checked={selectedCategories.includes(category.name)} onChange={handleChange} />;
                    })
                }
            </div>
            <button className="login-button hoverable" type="button" onClick={handleClick}>Save</button>
            <MyToast msg="Categories deleted successfully!" show={show} />
        </form>
    );
}

export default DeleteCategoryForm;