import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/Header.css'

function Header() {
    return (
        <Navbar bg="light" variant="light">
            <Nav className="mr-auto">
                <Navbar.Brand>
                    <Link className='nav-link' to="/home">Enrollable</Link>
                </Navbar.Brand>
                <Nav.Link>
                    <Link className='nav-link' to="/search">Class Search</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link className='nav-link' to="/generate">Generate Schedules</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link className='nav-link' to="/saved">Saved Schedules</Link>
                </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link>
                    <Link className='nav-link' to="/">Login</Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;