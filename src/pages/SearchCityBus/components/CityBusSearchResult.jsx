import React from "react";
import Loading from "../../../components/Loading";
import CardListLink from "../../../components/Cards";
import { storedItem } from "../../../global/storage";

const CityBusSearchResult = ({ busData, isLoading, city }) => {
  return (
    <>
      {busData ? (
        <>
          <Loading isLoading={isLoading} />
          <ul className="list-unstyled">
            {busData.map((item) => {
              return (
                <CardListLink
                  key={item.RouteUID}
                  to={`/BusInfo`}
                  onClick={() => {
                    let select = {
                      city,
                      routeUID: item.RouteUID,
                      routeName: item.RouteName.Zh_tw,
                      back: item.DepartureStopNameZh,
                      forth: item.DestinationStopNameZh,
                    };
                    storedItem("select", select);
                  }}
                  title={
                    item.isSameName
                      ? `${item.RouteName.Zh_tw} ${item.SubRoutes[0].Headsign}`
                      : item.RouteName.Zh_tw
                  }
                  text={
                    <>
                      {item.DepartureStopNameZh}
                      <span className="text-primary"> 往 </span>
                      {item.DestinationStopNameZh}
                    </>
                  }
                />
              );
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CityBusSearchResult;
