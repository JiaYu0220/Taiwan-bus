import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { Marker, Popup } from "react-leaflet";

const BusMarker = React.memo(({ stops, direction }) => {
  const busIcon = new L.Icon({
    iconUrl: "../../../../busIcon.svg",
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  return (
    <>
      {stops?.[direction]?.Stops
        ? stops[direction].Stops.filter((item) => item.PlateNumb).map(
            (item, index) => (
              <Marker
                key={index}
                icon={busIcon}
                position={[
                  item.BusPosition.PositionLat,
                  item.BusPosition.PositionLon,
                ]}
              >
                <Popup>
                  目前在「{item.StopName.Zh_tw}」
                  <p className="text-primary">
                    <FontAwesomeIcon
                      className={`fs-4 me-1 ${
                        !item.HasLiftOrRamp ? `d-none` : ``
                      }`}
                      icon={faWheelchair}
                    ></FontAwesomeIcon>
                    {item.PlateNumb}
                  </p>
                </Popup>
              </Marker>
            )
          )
        : null}
    </>
  );
});

export default BusMarker;
