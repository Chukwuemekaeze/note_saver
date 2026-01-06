import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NoteDetail from "./components/notes/NoteDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
