import React from 'react';

function ListGroupItem(props) {
    return (
        <label className="list-group-item">
            <input onChange={props.onChange} checked={props.checked} className="form-check-input me-1" type="checkbox" value={props.text} />
            {" " + props.text}
        </label>
    );
}

export default ListGroupItem;