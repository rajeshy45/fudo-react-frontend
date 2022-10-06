import React from 'react';

function Modal(props) {
    return (
        <div class="modal fade" id={props.id} tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content main-div">
                    <div class="modal-body">
                        <div class="container-fluid">{props.form}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;

