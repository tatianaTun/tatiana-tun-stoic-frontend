import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import Header from "./components/Header/Header";

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/exercises/" element={<ExercisesPage />} /> */}
        <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
