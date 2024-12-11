import React from 'react';
import logo from '../logo.png';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router";
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <>
            <div className='app-header'>
                <div className='container'>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                width="90"
                                height="90"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/rents">Rent</Nav.Link>
                                <Nav.Link href="/add-rent">Add Rent</Nav.Link>
                                <Nav.Link href="/rents">Rents</Nav.Link>
                            </Nav>
                            <div>
                                <Button variant='primary'  className='mx-2'>
                                    <Link to="/register" className='text-white'>Sign Up</Link>
                                </Button>
                                <Link to="/login">Login</Link>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className='container app-container'>
                <Outlet />
            </div>
        </>

    )
}

export default Root;