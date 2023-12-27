import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { useOutletContext } from "react-router-dom";
import { Container } from "react-bootstrap";
import StopsMarker from "./StopsMarker";
import BusMarker from "./BusMarker";
import Loading from "../../../../components/Loading";

const BusArrivalMap = () => {
  const [direction, stops, sec] = useOutletContext();
  // 是否是首次渲染
  const isFirstUpdate = useRef(true);
  // 線
  const [polyline, setPolyline] = useState([]);

  // 更換方向時要重新渲染線
  useEffect(() => {
    isFirstUpdate.current = true;
  }, [direction]);
  useEffect(() => {
    if (stops?.[direction]?.Stops && isFirstUpdate.current) {
      const stopPositionArray = stops[direction].Stops.map((item) => [
        item.StopPosition.PositionLat,
        item.StopPosition.PositionLon,
      ]);
      // 線
      setPolyline(stopPositionArray);

      // 只有第一次 stops 要渲染線
      isFirstUpdate.current = false;
    }
  }, [stops, direction]);

  return (
    <>
      {polyline.length ? (
        <>
          <Container>
            <p className="text-end text-white my-4">*於 {sec} 秒前更新</p>
          </Container>
          <MapContainer
            bounds={polyline}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            className="w-100 flex-grow-1 leaflet-dark"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <StopsMarker
              stops={stops}
              direction={direction}
              polyline={polyline}
              setPolyline={setPolyline}
            />
            <BusMarker stops={stops} direction={direction} />

            <Polyline pathOptions={{ color: `#FCD42C` }} positions={polyline} />
          </MapContainer>
        </>
      ) : (
        <Loading isLoading={!polyline.length} />
      )}
    </>
  );
};

export default BusArrivalMap;
