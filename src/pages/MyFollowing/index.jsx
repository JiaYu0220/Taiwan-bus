import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { CardWithHeart } from "../../components/Cards";
import { getStoredLocalItem, storedLocalItem } from "../../global/storage";
import { getCityAllBus } from "../../global/api";
import MyNavbar from "../../components/MyNavbar";
import { Container } from "react-bootstrap";
import { myAlert } from "../../components/Alert";
import EmptyMessage from "../../components/EmptyMessage";

const MyFollowing = () => {
  const [busData, setBusData] = useState([]);
  const [followList, setFollowList] = useState(
    getStoredLocalItem("followList") || []
  );
  const [isLoading, setIsLoading] = useState(true);

  async function getFollowBus() {
    try {
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
      }
      setIsLoading(false);
    } catch (error) {
      myAlert.errorModal();
    }
  }

  // 每次增加或刪除追蹤都更新 localStorage
  useEffect(() => {
    storedLocalItem("followList", followList);
    getFollowBus();
  }, [followList]);
  return (
    <Container className="d-flex flex-column vh-100">
      <MyNavbar />

      {isLoading ? (
        <Loading />
      ) : busData.length ? (
        <ul className="list-unstyled">
          {busData.map((item) => {
            return (
              <CardWithHeart
                key={item.RouteUID}
                bus={item}
                city={item.City}
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
      ) : (
        <EmptyMessage text="目前沒有追蹤的路線" />
      )}
    </Container>
  );
};

export default MyFollowing;
