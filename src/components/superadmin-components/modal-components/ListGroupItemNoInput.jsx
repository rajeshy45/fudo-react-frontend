import React from 'react';

function ListGroupItemNoInput(props) {
    return (
        <button data-bs-toggle="modal" data-bs-target={"#edit" + props.item._id} name={props.item.name} type="button" className="list-group-item list-group-item-action" >
            {" " + props.item.name}
        </button>
    );
}

export default ListGroupItemNoInput;