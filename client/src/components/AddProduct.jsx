import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function AddProduct() {
  const [productData, setProductData] = useState({ category: 'none', name: '', packSize: '', mrp: '', image: '', status: 'none' })
  const navTo = useNavigate()
  const { productId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productId) {
      axios.put(`http://localhost:4000/product/${productId}`, productData)
        .then((res) => {
          setProductData({ category: 'none', name: '', packSize: '', mrp: '', image: '', status: 'none' })
          console.log(res.data);
          navTo('/product')
        })
        .catch((err) => {
          console.log("Error couldn't create product");
          console.log(err.message);
        });
    } else {
      if (!Object.values(productData).includes('')) {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('packSize', productData.packSize);
        formData.append('category', productData.category);
        formData.append('mrp', productData.mrp);
        formData.append('image', productData.image);
        formData.append('status', productData.status);

        axios.post("http://localhost:4000/product", formData)
          .then((res) => {
            setProductData({ category: 'none', name: '', packSize: '', mrp: '', image: '', status: 'none' })
            console.log(res.data);
            navTo('/product')
          })
          .catch((err) => {
            console.log("Error couldn't create product");
            console.log(err.message);
          });
      } else {
        alert('Fill all the fields!')
      }
    }
  }

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:4000/product/${productId}`)
        .then((res) => {
          setProductData(res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log("Error couldn't get product");
          console.log(err.message);
        });
    }
  }, [productId, navTo])

  return (
    <Container fluid className='p-2'>
      <Stack direction='vertical' gap={3} className='shadow p-3 h-100'>
        <Stack direction='horizontal' gap={3} className='align-items-center'>
          <i class="fa-solid fa-arrow-left fs-5" style={{ cursor: 'pointer' }} onClick={() => {
            setProductData({ category: 'none', name: '', packSize: '', mrp: '', image: '', status: 'none' })
            navTo('/product')
          }}></i>
          <h4 className='m-0'>Add Product</h4>
        </Stack>
        <Form className='d-flex justify-content-between flex-column gap-4' onSubmit={handleSubmit}>
          <Stack direction='horizontal' className='d-flex justify-content-between'>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} style={{ width: '250px' }}>
                <option value='none'>-- Select --</option>
                <option value="milk">Milk</option>
                <option value="fruits">Fruits</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} style={{ width: '250px' }} type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pack Size</Form.Label>
              <Form.Control value={productData.packSize} onChange={(e) => setProductData({ ...productData, packSize: e.target.value })} style={{ width: '250px' }} type="text" />
            </Form.Group>
          </Stack>
          <Stack direction='horizontal' className='d-flex justify-content-between'>
            <Form.Group className="mb-3">
              <Form.Label>MRP</Form.Label>
              <Form.Control value={productData.mrp} onChange={(e) => setProductData({ ...productData, mrp: e.target.value })} style={{ width: '250px' }} type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })} style={{ width: '250px' }} type="file" accept='.jpg' />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select value={productData.status} onChange={(e) => setProductData({ ...productData, status: e.target.value })} style={{ width: '250px' }}>
                <option value='none'>None</option>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Form.Select>
            </Form.Group>
          </Stack>
          <Stack direction='horizontal' gap={4} className='d-flex justify-content-end w-100'>
            <Button type='reset' variant="secondary" style={{ color: '#662671', backgroundColor: 'transparent', borderColor: '#662671', borderRadius: '20px', width: '150px' }} onClick={() => {
              navTo('/product');
              setProductData({ category: 'none', name: '', packSize: '', mrp: '', image: '', status: 'none' })
            }}>Cancel</Button>
            <Button type='submit' variant="primary" style={{ backgroundColor: '#662671', borderRadius: '20px', width: '150px' }}>Confirm</Button>
          </Stack>
        </Form>
      </Stack>
    </Container>
  )
}
