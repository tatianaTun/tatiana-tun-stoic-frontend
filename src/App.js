import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { baseURL } from "./consts";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage/ExercisesPage";
import ChallengesPage from "./pages/ChallengesPage/ChallengesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  // const navigate = useNavigate();
  // const signupUrl = `${baseURL}/signup`;
  // const loginUrl = `${baseURL}/login`;

  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   // Here send a POST request to signupUrl with username, name and password data
  //   try {
  //     const response = await axios.post(signupUrl, {
  //       username: e.target.username.value,
  //       name: e.target.name.value,
  //       password: e.target.password.value,
  //     });
  //     console.log(response);
  //     setIsSignedUp(true);
  //   } catch (error) {}
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // Here send a POST request to loginUrl with username and password data
  //   try {
  //     const response = await axios.post(loginUrl, {
  //       username: e.target.username.value,
  //       password: e.target.password.value,
  //     });
  //     setIsLoggedIn(true);
  //     setIsLoginError(false);
  //     setErrorMessage("");
  //     sessionStorage.Storage.setItem("token", response.data.token);
  //   } catch (error) {}
  //   setIsLoginError(true);
  //   // setErrorMessage(error.response.data);
  // };

  // const renderSignUp = () => (
  //   <div>
  //     <h1>Sign Up</h1>
  //     <form onSubmit={handleSignup}>
  //       <div className="form-group">
  //         Username: <input type="text" name="username" />
  //       </div>
  //       <div className="form-group">
  //         Name: <input type="text" name="name" />
  //       </div>
  //       <div className="form-group">
  //         Password: <input type="password" name="password" />
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Signup
  //       </button>
  //     </form>
  //   </div>
  // );
  // const renderLogin = () => (
  //   <div>
  //     <h1>Login</h1>
  //     {isLoginError && <label className="error">{errorMessage}</label>}
  //     <form onSubmit={handleLogin}>
  //       <div className="form-group">
  //         Username: <input type="text" name="username" />
  //       </div>
  //       <div className="form-group">
  //         Password: <input type="password" name="password" />
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // );

  // Handle the Signup/Login
  // if (!isSignedUp) return renderSignUp();
  // if (!isLoggedIn) return renderLogin();

  // if (!isSignedUp) {navigate("/signup")};
  // if (!isLoggedIn) {navigate("/login")} ;

  if (!isSignedUp)
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    );
  // if (!isLoggedIn) return renderLogin();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
