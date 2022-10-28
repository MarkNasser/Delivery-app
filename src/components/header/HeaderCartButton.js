import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import React, { useContext, useState, useEffect } from "react";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (ctx.units === 0) return;

    setIsActive(true);
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.units]);

  const btnClasses = `${classes.button} ${isActive ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>your cart </span>
      <span className={classes.badge}>{ctx.units}</span>
    </button>
  );
};
export default HeaderCartButton;
