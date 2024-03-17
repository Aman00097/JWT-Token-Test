import axios from 'axios';
import React from 'react'
import { Button, Modal, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ShowModal({ show, setShow, action, deleteDataOf, id, removeCookies }) {
    const navTo = useNavigate();

    const handleClose = () => setShow(false);

    const handleLogoutOrDelete = () => {
        if (action === 'Delete') {
            if (deleteDataOf === 'category') {
                axios
                    .delete(`http://localhost:4000/category/${id}`)
                    .then((res) => {
                        handleClose();
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log("Failed to delete category");
                        console.log(err.message);
                    });
            } else {
                axios.delete(`http://localhost:4000/product/${id}`)
                    .then((res) => {
                        handleClose();
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log("Failed to delete category");
                        console.log(err.message);
                    });
            }
        } else {
            removeCookies('jwt');
            navTo('/login')
        }
    }

    return (
        <Modal show={show} onHide={handleClose} className='vh-100 d-flex align-items-center'>
            <Modal.Body>
                <Stack direction='vertical' gap={2} className='justify-content-center text-center'>
                    <Stack direction='horizontal' gap={2} className='justify-content-center align-items-center'>
                        <i class="fa-solid fa-triangle-exclamation fs-4 text-danger"></i>
                        <h4 className='m-0'>{action}</h4>
                    </Stack>
                    <h6 className='text-secondary'>Are you sure you want to {action.toLowerCase()} ?</h6>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Stack direction='horizontal' gap={4} className='d-flex justify-content-center w-100'>
                    <Button variant="secondary" style={{ color: '#662671', backgroundColor: 'transparent', borderColor: '#662671', borderRadius: '20px', width: '150px' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: '#662671', borderRadius: '20px', width: '150px' }} onClick={handleLogoutOrDelete}>
                        Confirm
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    )
}
