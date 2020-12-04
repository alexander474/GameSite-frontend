import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {Collapse, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const linkStyle = {
        fontWeight: "bold",
        color: "#FFFFFF",
        border: "1px solid #F5F5F5",
        cursor: "pointer",
        margin: "0 .5rem 0 .5rem",
        padding: ".3rem",
        textDecoration: "none"
    }

    const textStyle = {
        fontWeight: "bold",
        color: "#FFFFFF",
        cursor: "pointer",
        margin: "0 .5rem 0 .5rem",
        padding: ".3rem",
        textDecoration: "none",
        float: "right"
    }

    return (
        <Navbar style={{marginBottom: "1rem"}} color="dark" light expand="md">
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                {props.loggedIn.loggedIn ? (
                    <Nav className="mr-auto" navbar>
                        <NavLink to="/" style={linkStyle}>Home</NavLink>
                        <NavLink to="/games" style={linkStyle}>Games</NavLink>
                        <NavLink to="/characters" style={linkStyle}>Characters</NavLink>
                        <NavItem onClick={() => props.setLoggedIn({
                            loggedIn: true,
                            role: props.loggedIn.role === "USER" ? "ADMIN" : "USER"
                        })} style={linkStyle}>Change to {props.loggedIn.role === "USER" ? "ADMIN" : "USER"}</NavItem>
                        <NavItem style={textStyle}>Role: {props.loggedIn.role}</NavItem>
                    </Nav>
                ) : (
                    <Nav className="mr-auto" navbar>
                        <NavItem style={textStyle}>Not logged in</NavItem>
                    </Nav>
                )}
            </Collapse>
        </Navbar>
    )
}

export default Header