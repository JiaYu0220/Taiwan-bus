import React, { useEffect, useState } from "react";
import CityBusSearchResult from "../../../SearchCityBus/components/CityBusSearchResult";
import { CardWithHeart } from "../../../../components/Cards";
import { BtnIcon } from "../../../../components/Buttons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const RouteList = ({
  setCurrentList,
  selectStationBus,
  selectStationName,
  busData,
}) => {
  function handleClickBack() {
    setCurrentList("station");
  }
  return (
    busData.length && (
      <>
        <div className="d-flex justify-content-between align-items-center px-2">
          <BtnIcon
            icon={faCircleChevronLeft}
            onClick={handleClickBack}
          ></BtnIcon>

          <p className="fs-5 text-primary">{selectStationName}</p>
        </div>
        <CityBusSearchResult
          busData={busData}
          isLoading={busData.length === 0}
          city={selectStationBus[0].city} // 該站牌公車的城市都相同
        />
      </>
    )
  );
};

export default RouteList;
