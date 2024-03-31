import axios from "axios";
import { baseURL } from "../../consts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Here send a POST request to loginUrl with username and password data
    try {
      const loginUrl = `${baseURL}/auth/login`;
      const response = await axios.post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      console.log(response)
      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <Input type="text" name="username" />
          <Input type="password" name="password" />

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          {error && <div className="login__message">{error}</div>}
        </form>
        <p>
          Need an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
}
export default LoginPage;
