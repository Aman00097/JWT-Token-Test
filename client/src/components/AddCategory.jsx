import React from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'

export default function AddCategory() {
    return (
        <Container fluid className='p-2'>
            <Stack direction='vertical' gap={3} className='shadow p-3 h-100'>
                <Stack direction='horizontal' gap={3}>
                    <h4>Add Category</h4>
                </Stack>
                <Form className='d-flex justify-content-between'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control style={{ width: '250px' }} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{ width: '250px' }} type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select style={{ width: '250px' }} aria-label="Default select example">
                            <option>None</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>
                </Form>

                <Stack direction='horizontal' gap={4} className='d-flex justify-content-end w-100'>
                    <Button variant="secondary" style={{ color: '#662671', backgroundColor: 'transparent', borderColor: '#662671', borderRadius: '20px', width: '150px' }} >
                        Cancel
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: '#662671', borderRadius: '20px', width: '150px' }}>
                        Confirm
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}
