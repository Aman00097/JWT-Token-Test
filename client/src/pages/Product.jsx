import React, { useState } from 'react'
import { Button, Container, Stack, Table } from 'react-bootstrap'
import ShowModal from '../components/ShowModal';



let head = ['ID', 'Name', 'Description', 'Status'];

let datas = [
    { id: '1', name: 'milk', description: 'Lorem Ipsum is simply dummy text', status: true },
    { id: '2', name: 'fruits', description: 'Lorem Ipsum is simply dummy text', status: false },
    { id: '3', name: 'Vegetables', description: 'Lorem Ipsum is simply dummy text', status: true },
]


export default function Product() {
    return (
        <Container fluid className='p-2'>
            <Stack direction='vertical' gap={3} className='shadow'>
                <Stack direction='horizontal' className='d-flex align-items-center justify-content-between px-3'>
                    <Stack direction='horizontal' gap={3} className='align-items-center'>
                        <i className="fa-solid fa-boxes-stacked fs-5" />
                        <h4 className='m-0'>Product</h4>
                    </Stack>
                    <div className='d-flex align-items-center border rounded p-1 px-2'>
                        <i class="fa-solid fa-magnifying-glass text-secondary"></i>
                        <input type="search" className='border-0 ps-3' style={{ outline: 'none', width: '250px' }} />
                    </div>
                    <div>
                        <Button style={{ backgroundColor: '#662671', borderRadius: '10px' }}>Add New</Button>
                    </div>
                </Stack>

                <TableData />
            </Stack>
        </Container>
    )
}



function TableData() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    return (<>
        <Table striped hover>
            <thead>
                <tr style={{ backgroundColor: '#FFF8B7' }}>
                    {head.map((title) => <th className='text-center'>{title}</th>)}
                </tr>
            </thead>
            <tbody>
                {datas.map((data) => <tr>
                    <td className='text-center'>{data.id}</td>
                    <td className='text-center'>{data.name}</td>
                    <td className='text-center'>{data.description}</td>
                    <td className='text-center'>{data.status ? 'Active' : 'Inactive'}</td>
                    <td className='text-center'>
                        <i class="fa-regular fa-pen-to-square me-2 text-secondary" style={{ cursor: 'pointer' }}></i>
                        <i class="fa-solid fa-trash text-secondary" style={{ cursor: 'pointer' }} onClick={handleShow}></i>
                    </td>
                </tr>)}
            </tbody>

        </Table>
        <ShowModal show={show} setShow={setShow} action={'Delete'} />
    </>
    )
}
