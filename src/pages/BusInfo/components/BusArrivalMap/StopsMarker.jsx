import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

// 沒用 memo 會造成每秒都執行，因為父元件的狀態被改變了，雖然 props 的結果沒有變，子元件仍會被重新渲染

// 站牌
const StopsMarker = React.memo(({ stops, direction, polyline }) => {
  const map = useMap();

  // 更換方向時重新定位中心點和縮放
  useEffect(() => {
    polyline && map.fitBounds(polyline);
  }, [polyline]);

  function makeCircleIcon(num) {
    return L.divIcon({
      html: `<span class='circleMarker'>${num}</span>`,
      className: "",
      iconSize: [30, 30],
    });
  }

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

export default StopsMarker;
