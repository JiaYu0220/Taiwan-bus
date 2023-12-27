import React from "react";
import { CardListLink } from "../../../../components/Cards";
import { BtnTextLight } from "../../../../components/Buttons";
import { cityCodeMapping } from "../../../../global/constants";
import ViewBusBtn from "../ViewBusBtn";

const StationList = ({
  stationData,
  setCenter,
  setCurrentList,
  setSelectStationBus,
  setSelectStationName,
}) => {
  function handleCardLink(lat, lon) {
    setCenter([lat, lon]);
  }

  return (
    <>
      {/* 往返站位不重複列出 */}
      {stationData.length &&
        stationData
          .filter(
            (item, index) =>
              index === 0 ||
              item.StationName.Zh_tw !==
                stationData[index - 1].StationName.Zh_tw
          )
          .map((item) => (
            <CardListLink
              key={item.StationUID}
              title={item.StationName.Zh_tw}
              text={item.Stops.map((stop) => stop.RouteName.Zh_tw).join("、")}
              onClick={() =>
                handleCardLink(
                  item.StationPosition.PositionLat,
                  item.StationPosition.PositionLon
                )
              }
            >
              <ViewBusBtn
                data={item}
                setSelectStationName={setSelectStationName}
                setSelectStationBus={setSelectStationBus}
                setCurrentList={setCurrentList}
              />
            </CardListLink>
          ))}
    </>
  );
};

export default StationList;
