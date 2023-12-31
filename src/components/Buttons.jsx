import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

//元件內的文字可用 children 導入
const BtnTextPrimary = ({ onClick, children, className }) => {
  const defaultClassName = "w-100 shadow fs-lg-6";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  return (
    <Button
      variant="outline-primary"
      className={finalClassName}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const BtnTextLight = ({ onClick, children, className }) => {
  const defaultClassName = "w-100 text-light shadow fs-lg-6";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  return (
    <Button
      variant="outline-primary"
      className={finalClassName}
      onClick={onClick}
    >
      {children}
    </Button>
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

const BtnIcon = ({ onClick, icon, className, children }) => {
  const defaultClassName = "hover-scale";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <Button className={finalClassName} onClick={onClick} variant="link">
      <FontAwesomeIcon className="fs-5" icon={icon} />
      {children}
    </Button>
  );
};

const LinkIcon = ({ to, icon, className }) => {
  const defaultClassName = "text-light hover-scale";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  const navigate = useNavigate();

  function handleClick() {
    navigate(to);
  }

  return (
    <Button variant="link" onClick={handleClick} className={finalClassName}>
      <FontAwesomeIcon className="fs-5" icon={icon} />
    </Button>
  );
};

// 多個元件時不能用 export default (預設導出) -> 導入時不用{}，
// 要用 export (命名導出) -> 導入時要有{} import { BtnTextPrimary, BtnTextLight } from "./Buttons";
export { BtnTextLight, BtnTextPrimary, BtnRadio, BtnIcon, LinkIcon };
