import React from 'react';

function Modal(props) {
    return (
        <div className="modal fade" id={props.id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content main-div">
                    <div className="modal-body">
                        <div className="container-fluid">{props.form}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;

