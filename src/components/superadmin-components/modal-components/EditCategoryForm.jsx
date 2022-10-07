import React from 'react';
import { baseURL } from '../../../App';
import ListGroupItemNoInput from './ListGroupItemNoInput';

function EditCategoryForm() {

    const [categories, setCategories] = React.useState([]);
    const [search, setSearch] = React.useState("");


    function handleInput(event) {
        const value = event.target.value;
        setSearch(value);
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
            <h5 style={{ padding: "10px 0", color: "#FD4B4B" }}>Select category to edit</h5>
            <div className="input-group mb-3">
                <input value={search} onChange={handleInput} name="name" placeholder='Search Categories' type="text" className="input-number" />
            </div>
            <div className="list-group">
                {
                    GetCategories().filter((category) => {
                        return (category.name !== "All" && category.name.toLowerCase().includes(search.toLowerCase()));
                    }).sort().map((category, index) => {
                        return <ListGroupItemNoInput key={index} item={category} />;
                    })
                }
            </div>
        </form>
    );
}

export default EditCategoryForm;