import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchCityBus from "./pages/SearchCityBus";
import BusInfo from "./pages/BusInfo";
import { useState } from "react";

function App() {
  const [city, setCity] = useState({
    tw: "",
    en: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/SearchCityBus"
        element={<SearchCityBus city={city} setCity={setCity} />}
      />
      <Route
        path="/BusInfo"
        element={<BusInfo city={city} setCity={setCity} />}
      />
    </Routes>
  );
}

export default App;
