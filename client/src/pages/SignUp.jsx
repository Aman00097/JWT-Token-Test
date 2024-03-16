import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Logo from '../assets/logo.png';
import BgImg from '../assets/bg_img.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navTo = useNavigate();

    const data = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/, { message: 'Invalid email address' })
                .required('This is required field'),
            password: Yup.string().required('This is required field').min(8),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('This is a required field')
        }),
        onSubmit: async (values, action) => {
            const { email, password } = values
            try {
                const { data } = await axios.post('http://localhost:4000/register', { email, password }, { withCredentials: true });

                if (data.message === 'Login Successful') {
                    action.resetForm();
                    navTo('/');
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Container fluid style={{
            background: `url(${BgImg})`,
            backgroundSize: '100% 100%',
        }}>
            <Row className='d-flex align-items-center vh-100 ms-5'>
                <Col xs='4' className='shadow p-4 rounded bg-body d-flex flex-column'>
                    <img src={Logo} alt="" style={{ width: '150px', margin: 'auto' }} />
                    <p className='mb-3 text-center' style={{ color: '#717070' }}>Welcome to Digitalflake Admin</p>
                    <Form className='mb-3' onSubmit={data.handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type="email"
                                placeholder="name@example.com" id='email'
                                value={data.values.email}
                                onChange={data.handleChange}
                                onBlur={data.handleBlur} />
                            {data.touched.email && data.errors.email && <p style={{ color: "red", margin: "0", fontSize: '12px' }}>{data.errors.email}</p>}
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id='password'
                                placeholder="123"
                                value={data.values.password}
                                onChange={data.handleChange}
                                onBlur={data.handleBlur} />
                            {data.touched.password && data.errors.password && <p style={{ color: "red", margin: "0", fontSize: '12px' }}>{data.errors.password}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" id='confirmPassword'
                                placeholder="123"
                                value={data.values.confirmPassword}
                                onChange={data.handleChange}
                                onBlur={data.handleBlur} />
                            {data.touched.confirmPassword && data.errors.confirmPassword && <p style={{ color: "red", margin: "0", fontSize: '12px' }}>{data.errors.confirmPassword}</p>}
                        </Form.Group>
                        <Button type='submit' className='w-100 mb-1' style={{ backgroundColor: '#5C218B' }}>Sign Up</Button>
                    </Form>
                    <p style={{ textAlign: 'center' }}>Already have an account? <span onClick={() => navTo('/login')} style={{ color: '#A08CB1', cursor: 'pointer' }}>Log In</span></p>
                </Col>
            </Row>
        </Container>
    );
}
