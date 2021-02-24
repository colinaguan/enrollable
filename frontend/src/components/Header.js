import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../style/Header.css'

function Header() {
    const { currentUser, logout } = useAuth();
    const history = useHistory()

    async function handleSignOut() {
        try {
            await logout();
            history.push("/");
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <Navbar className='header' bg="light" variant="light">
            <Nav className="mr-auto">
                <Navbar.Brand>
                    <Link className='nav-link' to="/saved">Enrollable</Link>
                </Navbar.Brand>
                {
                    currentUser &&
                    <Link className='nav-link' to="/search">Class Search</Link>
                }
                {
                    currentUser &&
                    <Link className='nav-link' to="/generate">Generate Schedules</Link>
                }
                {
                    currentUser &&
                    <Link className='nav-link' to="/saved">Saved Schedules</Link>
                }
            </Nav>
            <Nav>
                <Container>
                    {
                        currentUser ?
                        <p className='nav-link' onClick={handleSignOut}>Sign Out</p> :
                        <Link className='nav-link' to="/">Login</Link>
                    }
                </Container>
            </Nav>
        </Navbar>
    );
}

export default Header;