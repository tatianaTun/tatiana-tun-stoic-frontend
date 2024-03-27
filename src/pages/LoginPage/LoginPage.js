import axios from "axios";
import { baseURL } from "../../consts";
import { useState, useEffect } from "react";

function LoginPage() {
    // const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const loginUrl = `${baseURL}/login`;

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Here send a POST request to loginUrl with username and password data
        try {
          const response = await axios.post(loginUrl, {
            username: e.target.username.value,
            password: e.target.password.value,
          });
          setIsLoggedIn(true);
          setIsLoginError(false);
          setErrorMessage("");
          sessionStorage.Storage.setItem("token", response.data.token);
        } catch (error) {}
        setIsLoginError(true);
        // setErrorMessage(error.response.data);
      };
    return <>  
        <div>
          <h1>Login</h1>
          {isLoginError && <label className="error">{errorMessage}</label>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              Username: <input type="text" name="username" />
            </div>
            <div className="form-group">
              Password: <input type="password" name="password" />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </>;
  }
  export default LoginPage;