import React, { useEffect, useState } from 'react';
import logo from '../logo.jpeg';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router";
import { Outlet } from 'react-router';
import { useNavigate } from "react-router";

const Root = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const isUserLoggedin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedin(true);
        } else {
            setIsLoggedin(false);
        }
    }

    const logOutUser = async () => {
        try {
            const response = await fetch('http://localhost:555/user/logout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
              throw new Error('Something went wrong');
            }
      
            setIsLoggedin(false);
            localStorage.removeItem('token');
            navigate('/');
          }
      
          catch (error) {
            alert(error);
          };
    }

    useEffect(() => {
        isUserLoggedin();

        if(localStorage.getItem('isAdmin') === 'true') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [])

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
                                <Nav.Link href="/rents">Rents</Nav.Link>
                                {isLoggedin && isAdmin && <Nav.Link href="/add-rent">Add Rent</Nav.Link>}
                                {isLoggedin && isAdmin && <Nav.Link href="/users">Users</Nav.Link>}
                                {isLoggedin && <Nav.Link href="/my-rents">My Rents</Nav.Link>}
                            </Nav>
                            {isLoggedin ? (
                                <Button variant='primary'  className='mx-2'>
                                    <Link onClick={logOutUser} className='text-white'>Log Out</Link>
                                </Button>
                            ) : (
                                <div>
                                    <Button variant='primary'  className='mx-2'>
                                        <Link to="/register" className='text-white'>Sign Up</Link>
                                    </Button>
                                    <Link to="/login">Login</Link>
                                </div>
                            )}  
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className='container app-container'>
                <Outlet context={{ isLoggedin, setIsLoggedin }} />
            </div>
        </>

    )
}

export default Root;