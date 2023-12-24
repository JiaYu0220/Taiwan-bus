import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { CardWithHeart } from "../../../components/Cards";
import { getStoredLocalItem, storedLocalItem } from "../../../global/storage";

const CityBusSearchResult = ({ busData, isLoading, city }) => {
  const [followList, setFollowList] = useState([]);
  // 最初渲染時取得 localStorage
  useEffect(() => {
    const followArray = getStoredLocalItem("followList") || [];
    setFollowList(followArray);
  }, []);

  // 每次增加或刪除追蹤都更新 localStorage
  useEffect(() => {
    storedLocalItem("followList", followList);
  }, [followList]);
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
                  bus={item}
                  city={city}
                  followList={followList}
                  setFollowList={setFollowList}
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
