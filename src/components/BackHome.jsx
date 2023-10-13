import React from "react";
import { Link } from "react-router-dom";

const BackHome = () => {
  return (
    <Link to="/">
      <picture>
        <source media="(min-width:576px)" srcSet="back-home-sm.png" />
        <source media="(min-width:992px)" srcSet="back-home-lg.png" />
        <img src="back-home.png" alt="logo" />
      </picture>
    </Link>
  );
};

export default BackHome;
