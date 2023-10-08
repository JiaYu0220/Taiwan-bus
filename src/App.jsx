import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Search from "./views/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Search" element={<Search />} />
    </Routes>
  );
}

export default App;
