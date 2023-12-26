import React, { useState } from "react";
import { BtnIcon } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import { storedItem, getStoredLocalItem } from "../global/storage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
const CardWithHeart = ({
  title,
  text,
  bus,
  city, // tw中文、en英文
  followList,
  setFollowList,
  children,
}) => {
  const [isFollow, setIsFollow] = useState(findIsFollow(bus.RouteUID));
  const navigate = useNavigate();

  // 比對追蹤列表是否有該路公車
  function findIsFollow(routeUID) {
    const followList = getStoredLocalItem("followList") || [];
    return followList.find((item) => item.routeUID === routeUID) ? true : false;
  }

  // 點擊卡片
  function handleClickCard() {
    const selectBus = {
      city: city.en,
      routeUID: bus.RouteUID,
      routeName: bus.RouteName.Zh_tw,
      back: bus.DepartureStopNameZh,
      forth: bus.DestinationStopNameZh,
    };
    storedItem("select", selectBus);

    navigate("/BusInfo");
  }

  function showConfirmSwal() {
    return withReactContent(Swal).fire({
      title: `確定要${isFollow ? "取消追蹤" : "加入追蹤"}嗎?`,
      showCancelButton: true,
      confirmButtonColor: "#1CC8EE",
      cancelButtonColor: "#414242",
      confirmButtonText: "確定",
    });
  }

  function showResultSwal() {
    withReactContent(Swal).fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "success",
      title: `${isFollow ? "已取消追蹤" : "已加入追蹤"}`,
    });
  }

  //  點擊愛心
  async function handleClickFollowing(e) {
    try {
      e.stopPropagation();
      const result = await showConfirmSwal();
      if (result.isConfirmed) {
        isFollow
          ? // 若原本有追蹤 -> 取消追蹤
            setFollowList(
              followList.filter((item) => item.routeUID !== bus.RouteUID)
            )
          : // 若原本沒追蹤 -> 加入追蹤
            setFollowList([
              ...followList,
              { city: city, routeUID: bus.RouteUID },
            ]);
        showResultSwal();
        // 變更畫面追蹤狀態
        setIsFollow(!isFollow);
      }
    } catch (error) {}
  }

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
};

export { CardWithHeart,CardListLink };
