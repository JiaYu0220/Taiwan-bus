import React from "react";
import { CardListLink } from "../../../../components/Cards";
import ViewBusBtn from "../ViewBusBtn";
import EmptyMessage from "../../../../components/EmptyMessage";

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

  return stationData.length ? (
    stationData
      .filter(
        // 往返站牌不重複列出
        (item, index) =>
          index === 0 ||
          item.StationName.Zh_tw !== stationData[index - 1].StationName.Zh_tw
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
      ))
  ) : (
    <EmptyMessage text="附近沒有站牌" />
  );
};

export default StationList;
