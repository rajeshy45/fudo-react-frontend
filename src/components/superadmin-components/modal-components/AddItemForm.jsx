import React from 'react';
import { baseURL, sendData } from "../../../App";
import MyToast from '../MyToast';

function AddItemForm() {

    const [item, setItem] = React.useState(
        {
            img: "images/gg_profile.png",
            name: "",
            description: "",
            price: "",
            category: "All"
        }
    );

    const [categories, setCategories] = React.useState([]);

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

    const [show, setShow] = React.useState(false);


    function handleSelect(event) {
        const value = event.target.innerHTML;
        setItem(prev => {
            return {
                ...prev,
                "category": value
            };
        });
    }

    function handleInput(event) {
        setShow(false);
        let { name, value } = event.target;

        if (name === "img") {
            let temp = value.split("\\");
            value = "/images/" + temp[temp.length - 1];
        }

        setItem(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    function handleClick() {
        sendData(baseURL + "/add-item", item);
        setItem(
            {
                img: "images/gg_profile.png",
                name: "",
                description: "",
                price: "",
                category: "All"
            }
        );
        setShow(true);
    }

    function reload() {
        window.location.reload();
    }


    return (
        <form>
            <div className="row">
                <div className="col col-8">
                    <h1 className="fw-bold login-title">Add Item</h1>
                </div>
                <div className="col col-4 text-end">
                    <i onClick={reload} className="fa-solid fa-circle-xmark close" data-bs-dismiss="modal"></i>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: "30px" }}>
                <img name="image" className="input-image" src={item.img} alt="item-img" />
                <input name="img" onChange={handleInput} className='input-image upload-btn' type="file" accept="image/*"></input>
            </div>
            <div className="input-group mb-3">
                <input value={item.name} onChange={handleInput} name="name" placeholder='Item Name' type="text" className="form-control ig-input ig-span-left" aria-label="Text input with dropdown button" />
                <button className="btn btn-outline-secondary dropdown-toggle ig-span-right" type="button" data-bs-toggle="dropdown">{item.category}</button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {
                        GetCategories().map((category, index) => {
                            return <li name="dd-item" className="dropdown-item" key={index} onClick={handleSelect}>{category.name}</li>;
                        })
                    }
                </ul>
            </div>
            <textarea value={item.description} onChange={handleInput} name="description" type="text" rows="3" className="input-number" placeholder="Description" />
            <div className="input-group mb-3 price">
                <span className="input-group-text ig-span-left">₹</span>
                <input value={item.price} onChange={handleInput} name="price" type="number" className="form-control ig-input" aria-label="price" placeholder="Price" />
                <span className="input-group-text ig-span-right">0.00</span>
            </div>
            <button className="login-button hoverable" type="button" onClick={handleClick}>Save</button>
            <MyToast msg="Item saved successfully!" show={show} />
        </form>
    );
}

export default AddItemForm;