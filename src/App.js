import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ExercisePage from "./pages/ExercisePage/ExercisePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/exercises/" element={<ExercisesPage />} /> */}
        <Route path="/exercise/:id" element={<ExercisePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
