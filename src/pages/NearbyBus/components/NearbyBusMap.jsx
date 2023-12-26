import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSimple, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useOutletContext } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import { getNearbyStationData } from "../../../global/api";

const LocationMarker = ({ position, setPosition, center, setCenter }) => {
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.setView(e.latlng, map.getZoom());
    },
  });
  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>我的位置</Popup>
    </Marker>
  );
};

const StationMarker = ({ position, stationData, setStationData, center }) => {
  const map = useMap();
  useMemo(() => {
    center && map.flyTo(center, map.getMaxZoom());
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
            </Popup>
          </Marker>
        ))}
    </>
  );
};

const NearbyBusMap = ({
  position,
  setPosition,
  stationData,
  center,
  setCenter,
}) => {
  return (
    <MapContainer
      center={[23.804064, 121.066217]}
      zoom={16}
      maxZoom={18}
      className="w-100 leaflet-dark h-100"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        position={position}
        setPosition={setPosition}
        center={center}
        setCenter={setCenter}
      />
      <StationMarker
        position={position}
        stationData={stationData}
        center={center}
      />
    </MapContainer>
  );
};

export default NearbyBusMap;
