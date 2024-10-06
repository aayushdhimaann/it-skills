const Login = () => {
  const loginHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "post",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return <h1>login</h1>;
};
export default Login;
