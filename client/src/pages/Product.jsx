import React, { useEffect, useState } from 'react'
import { Button, Container, Stack, Table } from 'react-bootstrap'
import ShowModal from '../components/ShowModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Product() {
    const [search, setSearch] = useState('')
    const navTo = useNavigate();

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
                        <input type="search" className='border-0 ps-3' style={{ outline: 'none', width: '250px' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div>
                        <Button style={{ backgroundColor: '#662671', borderRadius: '10px' }} onClick={() => navTo('/product/add-data')}>Add Product</Button>
                    </div>
                </Stack>

                <TableData search={search} />
            </Stack>
        </Container>
    )
}


function TableData({ search }) {
    const [products, setProducts] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [id, setId] = useState();
    const navTo = useNavigate();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const head = ['ID', 'Name', 'Pack Size', 'Category', 'MRP', 'Image', 'Status'];

    useEffect(() => {
        axios
            .get("http://localhost:4000/product")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
                setFilterData(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [show])

    useEffect(() => {
        setFilterData(products.filter((ele) => ele.name.includes(search)))
    }, [search])

    return (<>
        {
            filterData.length > 0 ? <Table striped hover>
                <thead>
                    <tr style={{ backgroundColor: '#FFF8B7' }}>
                        {head.map((title) => <th className='text-center'>{title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        filterData.map((data, index) => (<tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{data.name}</td>
                            <td className='text-center'>{data.packSize}</td>
                            <td className='text-center'>{data.category}</td>
                            <td className='text-center'>{data.mrp}</td>
                            <td className='text-center'><img src={`http://localhost:4000/images/${data.image}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></td>
                            {
                                data.status ?
                                    <td className='text-center text-success'>Active</td> :
                                    <td className='text-center text-danger'>Inactive</td>
                            }
                            <td className='text-center'>
                                <i class="fa-regular fa-pen-to-square me-2 text-secondary" style={{ cursor: 'pointer' }} onClick={() => {
                                    navTo(`/product/add-data/${data._id}`)
                                }}></i>
                                <i class="fa-solid fa-trash text-secondary" style={{ cursor: 'pointer' }} onClick={() => {
                                    setId(data._id)
                                    handleShow();
                                }}></i>
                            </td>
                        </tr>))
                    }
                </tbody>
            </Table> : <h3 className='text-center w-100 my-5'>No Data To Show</h3>
        }
        <ShowModal show={show} setShow={setShow} deleteDataOf={'product'} action={'Delete'} id={id} />
    </>
    )
}
