import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function MyToast(props) {
  return (
    <ToastContainer positon="top-center">
      <Toast className='bg-success text-white fs-6 m-3 w-100' show={props.show}>
        <Toast.Body>{props.msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MyToast;