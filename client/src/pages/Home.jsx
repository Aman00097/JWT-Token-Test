import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import Logo from '../assets/logo.png';
import ShowModal from '../components/ShowModal';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Home() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const navTo = useNavigate()
    const [cookies, setCookies, removeCookies] = useCookies([])

    useEffect(() => {
        const verifyUser = async () => {

            if (!cookies.jwt) {
                navTo('/login')
            } else {
                const { data } = await axios.post('http://localhost:4000/users', {}, { withCredentials: true });
                if (!data.status) {
                    removeCookies('jwt');
                    navTo('/login');
                }
            }
        }

        verifyUser();
    }, [cookies, navTo])

    return (
        <Container fluid className='p-3'>
            <div className='d-flex justify-content-end'>
                <Button variant='outline-danger' onClick={handleShow}>Log Out</Button>
            </div>
            <Stack direction='vertical' className='d-flex align-items-center justify-content-center' style={{ height: '60vh' }}>
                <img src={Logo} alt="" style={{ width: '200px' }} />
                <h5>Welcome to Digitalflake Admin</h5>
            </Stack>

            <ShowModal show={show} setShow={setShow} action={'Log Out'} removeCookies={removeCookies} />

        </Container>
    )
}
