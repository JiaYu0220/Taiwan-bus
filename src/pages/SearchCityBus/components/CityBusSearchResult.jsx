import React from "react";
import Loading from "../../../components/Loading";
import { CardWithHeart } from "../../../components/Cards";
import { storedItem } from "../../../global/storage";

const CityBusSearchResult = ({ busData, isLoading, city }) => {
  function handleClickCard() {}
  return (
    <>
      {busData ? (
        <>
          <Loading isLoading={isLoading} />
          <ul className="list-unstyled">
            {busData.map((item) => {
              return (
                <CardWithHeart
                  key={item.RouteUID}
                  to={`/BusInfo`}
                  select={{
                    city,
                    routeUID: item.RouteUID,
                    routeName: item.RouteName.Zh_tw,
                    back: item.DepartureStopNameZh,
                    forth: item.DestinationStopNameZh,
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
