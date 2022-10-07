import React from 'react';
import NavBar from '../components/superadmin-components/NavBar';
import SettingCard from '../components/superadmin-components/SettingCard';
import Modal from '../components/superadmin-components/Modal';
import AddItemForm from '../components/superadmin-components/modal-components/AddItemForm';
import AddCategoryForm from '../components/superadmin-components/modal-components/AddCategoryForm';
import DeleteItemForm from '../components/superadmin-components/modal-components/DeleteItemForm';
import DeleteCategoryForm from '../components/superadmin-components/modal-components/DeleteCategoryForm';
import EditItemForm from '../components/superadmin-components/modal-components/EditItemForm';
import EditItemFormHelper from '../components/superadmin-components/modal-components/EditItemFormHelper';
import EditCategoryForm from '../components/superadmin-components/modal-components/EditCategoryForm';
import EditCategoryFormHelper from '../components/superadmin-components/modal-components/EditCategoryFormHelper';
import Loading from '../components/Loading';
import { Navigate } from "react-router-dom";
import { baseURL } from '../App';


function SuperAdmin() {

    const [items, setItems] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + '/categories');
            const json = await response.json();
            setCategories(json.categories);
            console.log(json);
        };
        request();
    }, []);


    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + '/items');
            const json = await response.json();
            setItems(json.items);
            console.log(json);
        };
        request();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/auth/superadmin");
            const json = await response.json();
            setIsLoaded(true);
            setIsAuthenticated(json.isAuthenticated);
            console.log(json);
        };

        request();
    });

    if (!isLoaded) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/adminlogin" />;
    }

    return (
        <div id="superadmin-div">
            <Modal id="addItemModal" form={<AddItemForm />} />
            <Modal id="addCategoryModal" form={<AddCategoryForm />} />
            <Modal id="deleteItemModal" form={<DeleteItemForm />} />
            <Modal id="deleteCategoryModal" form={<DeleteCategoryForm />} />
            <Modal id="editItemModal" form={<EditItemForm />} />
            {
                items.map((item, index) => {
                    return <Modal key={index} id={"edit" + item._id} form={<EditItemFormHelper item={item} />} />;
                })
            }
            <Modal id="editCategoryModal" form={<EditCategoryForm />} />
            {
                categories.map((category, index) => {
                    return <Modal key={index} id={"edit" + category._id} form={<EditCategoryFormHelper category={category} />} />;
                })
            }
            <NavBar />
            <div style={{ margin: "0 5%" }} className='row'>
                <SettingCard id="addItemModal" title="Add Items" img="images/bx_cart-add.png" />
                <SettingCard id="editItemModal" title="Edit Items" img="images/edit-items.png" />
                <SettingCard id="deleteItemModal" title="Delete Items" img="images/delete.png" />
                <SettingCard id="addCategoryModal" title="Add Categories" img="images/categories-add.png" />
                <SettingCard id="editCategoryModal" title="Edit Categories" img="images/categories-edit.png" />
                <SettingCard id="deleteCategoryModal" title="Delete Categories" img="images/delete.png" />
                <SettingCard title="Edit Profile" img="images/gg_profile.png" />
            </div>
        </div>
    );
}

export default SuperAdmin;