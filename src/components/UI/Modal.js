import classes from "./Modal.module.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const portalContainer = document.getElementById("overlays");

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onOpen} />;
};

const Box = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onOpen={props.onOpen} />,
        portalContainer
      )}
      {ReactDOM.createPortal(<Box>{props.children}</Box>, portalContainer)}
    </React.Fragment>
  );
};
export default Modal;
