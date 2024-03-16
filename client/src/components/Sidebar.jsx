import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const sidebar = [
    {
        id: 1,
        icon: <i class="fa-solid fa-house me-2" />,
        name: 'Home',
        link: '/'
    },
    {
        id: 2,
        icon: <i className="fa-solid fa-list me-2" />,
        name: 'Category',
        link: '/category'
    },
    {
        id: 3,
        icon: <i class="fa-solid fa-boxes-stacked me-2" />,
        name: 'Product',
        link: '/product'
    }
]

export default function Sidebar() {
    const location = useLocation();
    const navTo = useNavigate();

    return (
        <Container fluid className='p-0 vh-100 overflow-hidden'>
            <nav className='d-flex justify-content-between align-items-center px-5 py-3' style={{ backgroundColor: '#662671', color: '#fff', cursor: 'pointer' }}>
                <h3><b>digital</b>flake</h3>
                <i className="fa-regular fa-circle-user fs-3"></i>
            </nav>
            <Row>
                <Col sm='3' md='2' className='border vh-100 p-0' style={{ backgroundColor: '#F4F4F4', maxWidth: '300px' }}>
                    <ListGroup>
                        {sidebar.map((ele) => {
                            return (
                                <ListGroup.Item key={ele.id} className='d-flex justify-content-between align-items-center my-1 px-4' style={{ backgroundColor: ele.link.slice(0, 4) === location.pathname.slice(0, 4) ? '#FFF8B7' : 'transparent', color: ele.link.slice(0, 4) === location.pathname.slice(0, 4) ? '#662671' : '#000', border: 'none', cursor: 'pointer' }} onClick={() => navTo(ele.link)}>
                                    <span>{ele.icon}{ele.name}</span>
                                    <i class={`fa-solid fa-caret-right ${ele.link.slice(0, 4) === location.pathname.slice(0, 4) ? '#662671' : 'text-secondary'}`}></i>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}
