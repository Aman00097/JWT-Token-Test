import React from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'

export default function AddProduct() {
  return (
    <Container fluid className='p-2'>
      <Stack direction='vertical' gap={3} className='shadow p-3 h-100'>
        <Stack direction='horizontal' gap={3}>
          <h4>Add Product</h4>
        </Stack>
        <Form className='d-flex justify-content-between flex-column gap-4'>
          <Stack direction='horizontal' className='d-flex justify-content-between'>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select style={{ width: '250px' }} aria-label="Default select example">
                <option>-- Select -- </option>
                <option value="milk">Milk</option>
                <option value="fruits">Fruits</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control style={{ width: '250px' }} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Pack Size</Form.Label>
              <Form.Control style={{ width: '250px' }} type="text" />
            </Form.Group>
          </Stack>
          <Stack direction='horizontal' className='d-flex justify-content-between'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>MRP</Form.Label>
              <Form.Control style={{ width: '250px' }} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Product Image</Form.Label>
              <Form.Control style={{ width: '250px' }} type="file" accept='.jpg' />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select style={{ width: '250px' }} aria-label="Default select example">
                <option>None</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Stack>
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
