import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { CardWithHeart } from "../../components/Cards";
import { getStoredLocalItem, storedLocalItem } from "../../global/storage";
import { getCityAllBus } from "../../global/api";
import MyNavbar from "../../components/MyNavbar";
import { Container } from "react-bootstrap";

const MyFollowing = () => {
  const [busData, setBusData] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFollowBus() {
    try {
      setIsLoading(true);
      if (followList.length) {
        const promises = followList.map((route) =>
          getCityAllBus(route.city.en, route.routeUID)
        );
        const resArr = await Promise.all(promises);
        let finalData = resArr.map((item) => item[0]);
        finalData.forEach((item, index) => {
          item.City = followList[index].city;
        });
        setBusData(finalData);
        console.log(finalData);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  // 最初渲染時取得 localStorage
  useEffect(() => {
    const followArray = getStoredLocalItem("followList") || [];
    setFollowList(followArray);
    console.log(followArray);
  }, []);

  // 每次增加或刪除追蹤都更新 localStorage
  useEffect(() => {
    storedLocalItem("followList", followList);
    getFollowBus();
    console.log(busData);
  }, [followList]);
  return (
    <>
      <Container>
        <MyNavbar />
        {followList.length && busData ? (
          <>
            <Loading isLoading={isLoading} />
            <ul className="list-unstyled">
              {busData.map((item) => {
                return (
                  <CardWithHeart
                    key={item.RouteUID}
                    bus={item}
                    city={item.city}
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
                    children={<p>{item.City.tw}</p>}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <p className="text-center fs-5 pt-5">目前沒有追蹤的路線</p>
          </>
        )}
      </Container>
    </>
  );
};

export default MyFollowing;
