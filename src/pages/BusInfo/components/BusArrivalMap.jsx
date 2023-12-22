import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import {
  LayerGroup,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useOutletContext } from "react-router-dom";
import { useLeafletContext } from "@react-leaflet/core";

// 沒用 memo 會造成每秒都執行 setView()，因為父元件的狀態被改變了，雖然 props 的結果沒有變，子元件仍會被重新渲染
const MapCenter = React.memo(({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());

  return null;
});

const StopsMarker = React.memo(({ stops, direction }) => {
  function makeCircleIcon(num) {
    return L.divIcon({
      html: `<span class='circleMarker'>${num}</span>`,
      className: "",
      iconSize: [30, 30],
    });
  }
  console.log("StopsMarker154");

  return (
    <>
      {stops?.[direction]?.Stops &&
        stops[direction].Stops.map((item, index) => (
          <Marker
            key={item.StopUID}
            position={[
              item.StopPosition.PositionLat,
              item.StopPosition.PositionLon,
            ]}
            icon={makeCircleIcon(index + 1)}
          >
            <Popup>{item.StopName.Zh_tw}</Popup>
          </Marker>
        ))}
    </>
  );
});

const BusMarker = ({ stops, direction }) => {
  const context = useLeafletContext();
  const busIcon = new L.Icon({
    iconUrl: "../../../../busIcon.svg",
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useMemo(() => {
    // 清除现有的 图层
    const { layerContainer } = context;
    layerContainer.clearLayers();

    if (stops?.[direction]?.Stops) {
      stops[direction].Stops.filter((item) => item.BusPosition).forEach(
        (item) => {
          console.log(item);
          L.marker(
            [item.BusPosition.PositionLat, item.BusPosition.PositionLon],
            { icon: busIcon }
          )
            .addTo(layerContainer) // 加入到圖層 layerContainer
            .bindPopup(
              // 加入視窗訊息
              `<div>
              目前在 ${item.StopName.Zh_tw}
              <p class="text-primary">
                <FontAwesomeIcon
                  class="fs-4 me-1 ${!item.HasLiftOrRamp ? "d-none" : ""}"
                  icon={faWheelchair}
                />
                ${item.PlateNumb}
              </p>
            </div>`
            );
        }
      );
    }
  }, [stops]);

  return null;
};

const BusArrivalMap = () => {
  const [direction, stops, sec] = useOutletContext();
  // 全部站牌的中間點
  const [center, setCenter] = useState([0, 0]);
  // 是否是首次渲染
  const isFirstUpdate = useRef(true);
  // 線
  const [polyline, setPolyline] = useState([]);
  useEffect(() => {
    if (stops?.[direction]?.Stops && isFirstUpdate.current) {
      const stopPositionArray = stops[direction].Stops.map((item) => [
        item.StopPosition.PositionLat,
        item.StopPosition.PositionLon,
      ]);
      // 線
      setPolyline(stopPositionArray);
      // 中間點
      setCenter(getCenterPosition(stopPositionArray));

      // 只有第一次 stops 要算中心點和渲染線
      isFirstUpdate.current = false;
    }
  }, [stops]);

  // 算出中心點
  function getCenterPosition(array) {
    let result = [0, 0];
    array.forEach((item) => {
      result[0] += parseFloat(item[0]);
      result[1] += parseFloat(item[1]);
    });
    result[0] = (result[0] / array.length).toFixed(6);
    result[1] = (result[1] / array.length).toFixed(6);
    return result;
  }

  return (
    <>
      <p className="text-end text-white my-4">*於 {sec} 秒前更新</p>

      <MapContainer
        center={[25.08832, 121.48663]}
        zoom={14}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        className="w-100 flex-grow-1 leaflet-dark"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenter center={center} />
        <StopsMarker stops={stops} direction={direction} />
        <LayerGroup>
          <BusMarker stops={stops} direction={direction} />
        </LayerGroup>

        {polyline.length > 0 && (
          <Polyline pathOptions={{ color: `#1CC8EE` }} positions={polyline} />
        )}
      </MapContainer>
    </>
  );
};

export default BusArrivalMap;
