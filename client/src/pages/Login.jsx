import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Stack } from 'react-bootstrap';
import Logo from '../assets/logo.png';
import BgImg from '../assets/bg_img.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navTo = useNavigate();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const data = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required("This is a required field"),
            password: Yup.string()
                .required("This is a required field")
                .min(8, 'Password must be at least 8 characters')
        }),
        onSubmit: async (values, action) => {
            const { email, password } = values
            try {
                const { data } = await axios.post('http://localhost:4000/users/login', { email, password }, { withCredentials: true });
                console.log(data)
                if (data.message === 'Login Successful') {
                    action.resetForm();
                    navTo('/');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    });

    return (
        <Container fluid style={{ background: `url(${BgImg})`, backgroundSize: '100% 100%' }}>
            <Row className='d-flex align-items-center vh-100 ms-5'>
                <Col xs='4' className='shadow p-4 rounded bg-body d-flex flex-column'>
                    <img src={Logo} alt="" style={{ width: '150px', margin: 'auto' }} />
                    <p className='mb-3 text-center' style={{ color: '#717070' }}>Welcome to Digitalflake Admin</p>
                    <Form onSubmit={data.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type="email" id='email' placeholder="name@example.com"
                                value={data.values.email}
                                onChange={data.handleChange}
                                onBlur={data.handleBlur} />
                            {data.touched.email && data.errors.email && <p style={{ color: "red", margin: "0", fontSize: '12px' }}>{data.errors.email}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="123" id='password'
                                value={data.values.password}
                                onChange={data.handleChange}
                                onBlur={data.handleBlur} />
                            {data.touched.password && data.errors.password && <p style={{ color: "red", margin: "0", fontSize: '12px' }}>{data.errors.password}</p>}
                            <p className='mb-4' style={{ color: '#A08CB1', textAlign: 'end', cursor: 'pointer' }}><span onClick={handleShow}>Forget Password</span></p>
                        </Form.Group>
                        <Button type='submit' className='w-100 mb-1' style={{ backgroundColor: '#5C218B' }}>Log In</Button>
                    </Form>
                    <p style={{ textAlign: 'center' }}>Create new account? <span onClick={() => navTo('/signup')} style={{ color: '#A08CB1', cursor: 'pointer' }}>Sign Up</span></p>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} className='vh-100 d-flex align-items-center'>
                <Modal.Body>
                    <Stack className='text-center'>
                        <h5 style={{ color: '#662671' }}>Did you forget your password?</h5>
                        <p className=''>Enter your email address and we'll send you a link to reset your password</p>
                        <Form.Group className="mb-2 text-start" style={{ width: '300px', margin: 'auto' }}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction='vertical' gap={2}>
                        <Button variant="primary" style={{ width: '300px', margin: 'auto', backgroundColor: '#662671', borderRadius: '5px' }} onClick={handleClose}>
                            Request reset link
                        </Button>
                        <u className='text-center' style={{ color: '#979595', fontSize: '12px', cursor: 'pointer' }} onClick={handleClose}>Back to log in</u>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
