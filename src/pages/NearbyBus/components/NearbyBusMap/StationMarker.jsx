import React, { useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSimple, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { Marker, Popup, useMap } from "react-leaflet";
import ViewBusBtn from "../ViewBusBtn";

const StationMarker = ({
  stationData,
  center,
  position,
  setSelectStationName,
  setSelectStationBus,
  setCurrentList,
}) => {
  const map = useMap();
  useMemo(() => {
    center && map.flyTo(center, center === position ? 16 : map.getMaxZoom());
  }, [center]);
  function makeStationIcon(stationName) {
    const stationIconHtml = ReactDOMServer.renderToString(
      <>
        <span className="fa-layers text-black fa-3x">
          {/* 外框 */}
          <FontAwesomeIcon icon={faLocationPin} className="text-primary" />
          {/* 圖案 */}
          <FontAwesomeIcon icon={faLocationPin} transform="shrink-2" />
          <FontAwesomeIcon
            icon={faBusSimple}
            className="text-primary"
            transform="shrink-10 up-2.5"
          />
        </span>
        <p className="text-primary lh-1">{stationName}</p>
      </>
    );
    const stationIcon = L.divIcon({
      html: stationIconHtml,
      className: "",
    });
    return stationIcon;
  }

  return (
    <>
      {stationData.length &&
        stationData.map((item, index) => (
          <Marker
            key={index}
            icon={makeStationIcon(item.StationName.Zh_tw)}
            position={[
              item.StationPosition.PositionLat,
              item.StationPosition.PositionLon,
            ]}
          >
            <Popup>
              <p>{item.StationName.Zh_tw}站</p>
              <p>地址：{item.StationAddress}</p>
              <p className="text-primary">
                公車：
                {item.Stops.map((stop) => stop.RouteName.Zh_tw).join("、")}
              </p>
              <ViewBusBtn
                data={item}
                setSelectStationName={setSelectStationName}
                setSelectStationBus={setSelectStationBus}
                setCurrentList={setCurrentList}
              />
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default StationMarker;
