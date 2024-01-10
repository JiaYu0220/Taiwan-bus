import React, { useCallback, useState } from "react";
import { BtnIcon } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import { storedItem, getStoredLocalItem } from "../global/storage";
import { myAlert } from "./Alert";

const CardListLink = ({ title, text, onClick, children }) => {
  return (
    <li className="card bg-strip hover-bg-gray-light">
      <div
        onClick={onClick}
        className="card-body d-flex justify-content-between align-items-center pe-2 cursor-pointer"
      >
        <div>
          <h2 className="card-title fs-5 fs-lg-4 fw-medium">{title}</h2>
          <p className="fs-7 fs-lg-6 text-light">{text}</p>
        </div>
        {children}
      </div>
    </li>
  );
};
const CardWithHeart = React.memo(
  ({
    title,
    text,
    bus,
    city, // tw中文、en英文
    followList,
    setFollowList,
    children,
  }) => {
    const navigate = useNavigate();

    // 比對追蹤列表是否有該路公車
    const findIsFollow = useCallback((routeUID) => {
      const followList = getStoredLocalItem("followList") || [];
      return followList.find((item) => item.routeUID === routeUID)
        ? true
        : false;
    }, []);
    const [isFollow, setIsFollow] = useState(findIsFollow(bus.RouteUID));

    // 點擊卡片
    const handleClickCard = useCallback(() => {
      const selectBus = {
        city: city.en,
        routeUID: bus.RouteUID,
        routeName: bus.RouteName.Zh_tw,
        back: bus.DepartureStopNameZh,
        forth: bus.DestinationStopNameZh,
      };
      storedItem("select", selectBus);

      navigate("/BusInfo");
    }, [bus, city, navigate]);

    //  點擊愛心
    const handleClickFollowing = useCallback(
      async (e) => {
        e.stopPropagation();
        const followTitle = `確定要${isFollow ? "取消" : "加入"}追蹤嗎？`;
        const result = await myAlert.confirmModal(followTitle);

        if (result.isConfirmed) {
          isFollow
            ? setFollowList(
                followList.filter((item) => item.routeUID !== bus.RouteUID)
              )
            : setFollowList([
                ...followList,
                { city: city, routeUID: bus.RouteUID },
              ]);

          // const followResult = `已${isFollow ? "取消" : "加入"}追蹤`;
          // myAlert.miniToast(followResult);

          setIsFollow(!isFollow);
        }
      },
      [isFollow, bus, city, followList, setFollowList]
    );

    return (
      <CardListLink onClick={handleClickCard} title={title} text={text}>
        {
          <div className="text-center">
            <BtnIcon
              icon={isFollow ? fasFaHeart : farFaHeart}
              onClick={(e) => handleClickFollowing(e)}
            />
            {children}
          </div>
        }
      </CardListLink>
    );
  }
);

export { CardWithHeart, CardListLink };
