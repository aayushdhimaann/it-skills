import { Button, Form } from "react-bootstrap";

const Signup = () => {
  const signupHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "post",
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <Form onSubmit={signupHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Enter email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Enter password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
};
export default Signup;
