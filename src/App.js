import "./App.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages";
import DetailPage from "./pages/Detail.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
