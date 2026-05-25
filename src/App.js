import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Fridge from "./pages/Fridge";


console.log(Login);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fridge" element={<Fridge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
