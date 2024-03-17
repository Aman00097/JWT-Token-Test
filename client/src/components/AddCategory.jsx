import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export default function AddCategory() {
    const [categoryData, setCategoryData] = useState({ name: '', description: '', status: 'none' })
    const navTo = useNavigate()
    const { categoryId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(categoryData).includes('')) {
            if (categoryId) {
                axios
                    .put(`http://localhost:4000/category/${categoryId}`, categoryData)
                    .then((res) => {
                        setCategoryData({ name: '', description: '', status: 'none' });
                        console.log(res.data);
                        navTo('/category')
                    })
                    .catch((err) => {
                        console.log("Error couldn't create category");
                        console.log(err.message);
                    });
            } else {
                axios.post("http://localhost:4000/category", categoryData)
                    .then((res) => {
                        setCategoryData({ name: '', description: '', status: 'none' });
                        console.log(res.data);
                        navTo('/category')
                    })
                    .catch((err) => {
                        console.log("Error couldn't create category");
                        console.log(err.message);
                    });
            }
        } else {
            alert('Fill all the fields');
        }
    }

    useEffect(() => {
        if (categoryId) {
            axios
                .post(`http://localhost:4000/category/${categoryId}`, { categoryId })
                .then((res) => {
                    setCategoryData(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log("Error couldn't get category");
                    console.log(err.message);
                });
        }
    }, [categoryId, navTo])


    return (
        <Container fluid className='p-2'>
            <Stack direction='vertical' gap={3} className='shadow p-3'>
                <Stack direction='horizontal' gap={3}>
                    <i class="fa-solid fa-arrow-left fs-5" style={{ cursor: 'pointer' }} onClick={() => {
                        navTo('/category')
                        setCategoryData({ name: '', description: '', status: 'none' });
                    }}></i>
                    <h4 className='m-0'>Add Category</h4>
                </Stack>
                <Form onSubmit={handleSubmit}>
                    <Stack direction='horizontal' gap={4} className='d-flex justify-content-between w-100'>
                        <Form.Group className="mb-5">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type='text' value={categoryData.name} onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })} style={{ width: '250px' }} />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' value={categoryData.description} onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })} style={{ width: '250px' }} />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label>Status</Form.Label>
                            <Form.Select onChange={(e) => setCategoryData({ ...categoryData, status: e.target.value })} value={categoryData.status} style={{ width: '250px' }}>
                                <option value="none">None</option>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Stack>
                    <Stack direction='horizontal' gap={4} className='d-flex justify-content-end w-100'>
                        <Button type='reset' variant="secondary" style={{ color: '#662671', backgroundColor: 'transparent', borderColor: '#662671', borderRadius: '20px', width: '150px' }} onClick={() => {
                            navTo('/category');
                            setCategoryData({ name: '', description: '', status: 'none' });
                        }}>Cancel</Button>
                        <Button type='submit' variant="primary" style={{ backgroundColor: '#662671', borderRadius: '20px', width: '150px' }}>Confirm</Button>
                    </Stack>
                </Form>
            </Stack>
        </Container>
    )
}
