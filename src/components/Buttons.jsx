import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//元件內的文字可用 children 導入
const BtnTextPrimary = ({ onClick, children, className }) => {
  const defaultClassName = "w-100 btn btn-outline-primary shadow fs-lg-6";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  return (
    <button type="button" className={finalClassName} onClick={onClick}>
      {children}
    </button>
  );
};

const BtnTextLight = ({ onClick, children, className }) => {
  const defaultClassName =
    "w-100 btn btn-outline-primary text-light shadow fs-lg-6";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  return (
    <button type="button" className={finalClassName} onClick={onClick}>
      {children}
    </button>
  );
};

const BtnRadio = ({ onClick, name, id, htmlFor, children, className }) => {
  const defaultClassName =
    "w-100 btn btn-radio btn-outline-primary shadow fs-lg-6";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  return (
    <>
      <input type="radio" name={name} id={id} className="d-none" />
      <label htmlFor={htmlFor} className={finalClassName} onClick={onClick}>
        {children}
      </label>
    </>
  );
};

const BtnIcon = ({ onClick, icon }) => {
  return (
    <button type="button" className="btn btn-link hover-scale">
      <FontAwesomeIcon className="fs-5" icon={icon} />
    </button>
  );
};

// 多個元件時不能用 export default (預設導出) -> 導入時不用{}，
// 要用 export (命名導出) -> 導入時要有{} import { BtnTextPrimary, BtnTextLight } from "./Buttons";
export { BtnTextLight, BtnTextPrimary, BtnRadio, BtnIcon };
