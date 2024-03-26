import axios from "axios";
import { baseURL } from "../../consts";
import { useState, useEffect } from "react";

function SignupPage() {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const signupUrl = `${baseURL}/signup`;

    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Here send a POST request to signupUrl with username, name and password data
        try {
          const response = await axios.post(signupUrl, {
            username: e.target.username.value,
            name: e.target.name.value,
            password: e.target.password.value,
          });
          console.log(response);
          setIsSignedUp(true);
        } catch (error) {}
      };
  return <>    <div>
  <h1>Sign Up</h1>
  <form onSubmit={handleSignup}>
    <div className="form-group">
      Username: <input type="text" name="username" />
    </div>
    <div className="form-group">
      Name: <input type="text" name="name" />
    </div>
    <div className="form-group">
      Password: <input type="password" name="password" />
    </div>
    <button type="submit" className="btn btn-primary">
      Signup
    </button>
  </form>
</div></>;
}
export default SignupPage;
