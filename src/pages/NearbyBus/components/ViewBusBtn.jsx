import React from "react";
import { cityCodeMapping } from "../../../global/constants";
import { BtnTextPrimary } from "../../../components/Buttons";

const ViewBusBtn = ({
  data,
  setSelectStationName,
  setSelectStationBus,
  setCurrentList,
}) => {
  function handleBtnClick(stationName, cityCode, stops) {
    let city = cityCodeMapping.find((item) => item.cityCode === cityCode);
    const array = stops.map((item) => {
      return { city, routeName: item.RouteName.Zh_tw };
    });
    setSelectStationName(stationName);
    setSelectStationBus(array);
    setCurrentList("route");
  }
  return (
    <span>
      <BtnTextPrimary
        onClick={() =>
          handleBtnClick(
            data.StationName.Zh_tw,
            data.LocationCityCode,
            data.Stops
          )
        }
      >
        查看公車
      </BtnTextPrimary>
    </span>
  );
};

export default ViewBusBtn;
