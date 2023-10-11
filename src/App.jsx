import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SearchCityBus from "./views/SearchCityBus";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SearchCityBus" element={<SearchCityBus />} />
    </Routes>
  );
}

export default App;
