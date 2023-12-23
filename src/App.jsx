import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchCityBus from "./pages/SearchCityBus";
import BusInfo from "./pages/BusInfo";
import { useState } from "react";
import BusArrivalTime from "./pages/BusInfo/components/BusArrivalTime";
import BusArrivalMap from "./pages/BusInfo/components/BusArrivalMap";
import NearbyBus from "./pages/NearbyBus";

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
      >
        <Route index element={<BusArrivalTime />} />
        <Route path="BusArrivalMap" element={<BusArrivalMap />} />
      </Route>
      <Route path="/NearbyBus" element={<NearbyBus />} />
    </Routes>
  );
}

export default App;
