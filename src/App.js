import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage/ExercisesPage";
import ChallengePage from "./pages/ChallengePage/ChallengePage";
import ChallengesPage from "./pages/ChallengesPage/ChallengesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:challengeId" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
