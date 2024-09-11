"use client"
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ApplicationContext } from "../../context/application-context";

const NavBar = () => {
  const ctx = useContext(ApplicationContext);
  const loginHandler = (e) => {
    e.preventDefault();
    alert("login");
  };
  const loginForm = (
    <Form onSubmit={loginHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button
            variant="outline-success"
            className="ms-2"
            onClick={() => {
              ctx.showModal(true, "Login", loginForm);
            }}
          >
            Login
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
