import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import StationMarker from "./StationMarker";

const NearbyBusMap = ({
  position,
  setPosition,
  stationData,
  center,
  setCenter,
  setSelectStationName,
  setSelectStationBus,
  setCurrentList,
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
        setSelectStationName={setSelectStationName}
        setSelectStationBus={setSelectStationBus}
        setCurrentList={setCurrentList}
      />
    </MapContainer>
  );
};

export default NearbyBusMap;
