import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPerson } from "@fortawesome/free-solid-svg-icons";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.setView(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  function makePersonIcon() {
    const personIconHtml = ReactDOMServer.renderToString(
      <span className="fa-layers text-black fa-3x">
        {/* 外框 */}
        <FontAwesomeIcon icon={faCircle} className="text-warning" />
        {/* 圖案 */}
        <FontAwesomeIcon icon={faCircle} transform="shrink-2" />
        <FontAwesomeIcon
          icon={faPerson}
          className="text-warning"
          transform="shrink-7"
        />
      </span>
    );
    const personIcon = L.divIcon({
      html: personIconHtml,
      className: "",
    });
    return personIcon;
  }
  return position === null ? null : (
    <Marker position={position} icon={makePersonIcon()}>
      <Popup>我的位置</Popup>
    </Marker>
  );
};

export default LocationMarker;
