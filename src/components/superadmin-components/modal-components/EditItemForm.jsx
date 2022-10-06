import React from 'react';
import ListGroupItemNoInput from './ListGroupItemNoInput';

function EditItemForm() {

    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState("All");
    const [search, setSearch] = React.useState("");
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
                const response = await fetch('/categories');
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

    function reload() {
        window.location.reload();
    }

    return (
        <form>
            <div className="row">
                <div className="col col-8">
                    <h1 className="fw-bold login-title">Edit Item</h1>
                </div>
                <div className="col text-end">
                    <i onClick={reload} className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <h5 style={{ padding: "10px 0", color: "#FD4B4B" }}>Select item to edit</h5>
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
                        return <ListGroupItemNoInput key={index} item={item} />
                    })
                }
            </div>
        </form>
    );
}

export default EditItemForm;