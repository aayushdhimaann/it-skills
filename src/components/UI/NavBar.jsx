"use client";
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ApplicationContext } from "../../context/application-context";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Link from "next/link";

const NavBar = () => {
  const ctx = useContext(ApplicationContext);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link href="/" className="no-underline hover:underline">Home</Link>
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
              ctx.showModal(true, "Login", <Login/>);
            }}
          >
            Login
          </Button>
          <Button
            variant="outline-success"
            className="ms-2"
            onClick={() => {
              ctx.showModal(true, "Signup", <Signup/>);
            }}
          >
            Signup
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
