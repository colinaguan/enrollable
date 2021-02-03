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
                <Link className='nav-link' to="/search">Class Search</Link>
                <Link className='nav-link' to="/generate">Generate Schedules</Link>
                <Link className='nav-link' to="/saved">Saved Schedules</Link>
            </Nav>
            <Nav>
                <Link className='nav-link' to="/">Login</Link>
            </Nav>
        </Navbar>
    );
}

export default Header;