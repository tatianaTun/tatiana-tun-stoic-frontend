import "./SignupPage.scss";
import axios from "axios";
import { baseURL } from "../../consts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

function SignupPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    // Here send a POST request to signupUrl with username, name and password data
    try {
      const signupUrl = `${baseURL}/auth/signup`;
      await axios.post(signupUrl, {
        username: event.target.username.value,
        name: event.target.name.value,
        password: event.target.password.value,
      });
      setSuccess(true);
      setError(null);
      event.target.reset();
      navigate("/login");
    } catch (error) {
      setSuccess(false);
      setError(error.response.data);
    }
  };
  return (
    <>
      {" "}
      <div className="signup-page">
        <form onSubmit={handleSignup} className="signup">
          <h1 className="signup__title">Sign Up</h1>
          <Input type="text" name="username" label="Username" />
          <Input type="text" name="name" label="Name" />
          <Input type="password" name="password" label="Password" />
          
          <button type="submit" className="signup__button">Signup</button>

          {success && <div className="signup__message">Signed up!</div>}
          {error && <div className="signup__message">{error}</div>}
        </form>
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </>
  );
}
export default SignupPage;
