import React from "react";
import { CardListLink } from "../../../components/Cards";
import { useNavigate } from "react-router-dom";
import { BtnTextLight } from "../../../components/Buttons";
import { useMapEvents } from "react-leaflet";

const NearbyBusList = ({ stationData, setCenter }) => {
  const navigate = useNavigate();
  function handleCardLink(lat, lon) {
    setCenter([lat, lon]);
  }
  return (
    <ul>
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
              <span>
                <BtnTextLight>查看公車</BtnTextLight>
              </span>
            </CardListLink>
          ))}
    </ul>
  );
};

export default NearbyBusList;
