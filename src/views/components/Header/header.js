import React, {Component} from 'react'
import './header.css'
import Navbar from 'react-bootstrap/Navbar'


function Header() {
  return (
    <Navbar className="Header">
    <Navbar.Brand href="/">
      <img
        alt=""
        // src={logo}
        width="40"
        height="40"
        // className="d-inline-block align-top"
      />{' '}
      Invoice
    </Navbar.Brand>
  </Navbar>
  );
}

export default Header;