import React, { useState, useEffect } from "react";
import StationList from "./StationList";
import RouteList from "./RouteList";
import { getBusData } from "../../../../global/api";

const NearbyBusList = ({
  stationData,
  setCenter,
  currentList,
  setCurrentList,
  selectStationBus,
  setSelectStationBus,
  selectStationName,
  setSelectStationName,
}) => {
  const [busData, setBusData] = useState([]);

  async function getAllBus() {
    if (selectStationBus.length) {
      const promises = selectStationBus.map((item) =>
        getBusData(item.city.en, item.routeName)
      );
      const resArr = await Promise.all(promises);
      const finalData = resArr.map((item) => item[0]);
      setBusData(finalData);
    }
  }
  useEffect(() => {
    currentList === "route" && getAllBus();
  }, [currentList]);
  return (
    <ul className="list-unstyled">
      {currentList === "station" && (
        <StationList
          stationData={stationData}
          setCenter={setCenter}
          setCurrentList={setCurrentList}
          setSelectStationBus={setSelectStationBus}
          setSelectStationName={setSelectStationName}
        />
      )}
      {currentList === "route" && (
        <RouteList
          setCurrentList={setCurrentList}
          selectStationBus={selectStationBus}
          selectStationName={selectStationName}
          busData={busData}
        />
      )}
    </ul>
  );
};

export default NearbyBusList;
