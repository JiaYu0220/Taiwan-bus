import React from "react";
import { BtnIcon } from "./Buttons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";

const CardListLink = ({ title, text, to, onClick, children }) => {
  return (
    <li className="card bg-strip hover-bg-gray-light">
      <Link
        to={to}
        onClick={onClick}
        className="card-body d-flex justify-content-between align-items-center pe-2"
      >
        <div>
          <h2 className="card-title fs-5 fs-lg-4 fw-medium">{title}</h2>
          <p className="fs-7 fs-lg-6 text-light">{text}</p>
        </div>
        {children}
      </Link>
    </li>
  );
};
const CardWithHeart = ({ title, text, to, select }) => {
  /**  select={
   *   city,
   *   routeUID: item.RouteUID,
   *   routeName: item.RouteName.Zh_tw,
   *   back: item.DepartureStopNameZh,
   *   forth: item.DestinationStopNameZh,
   *    }
   */
  function handleClickCard() {
    storedItem("select", select);
    // 往返方向，預設為 0
    storedItem("direction", 0);
  }

  return (
    <CardListLink to={to} onClick={handleClickCard()} title={title} text={text}>
      {<BtnIcon icon={farFaHeart} />}
    </CardListLink>
  );
};

export { CardWithHeart };
