import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartIteam from "./CartIteam";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { Select } from "antd";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const ctx = useContext(CartContext);
  const hasIteam = !!ctx.items.length;

  const closeHandler = () => {
    props.onClose();
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const CartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const CartItemAddHandler = (item) => {
    ctx.addItem(item);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={closeHandler}>
        Close
      </button>
      {hasIteam && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <>
      <Modal onOpen={props.onClose}>
        {/* <Select
          style={{ position: "relative" }}
          // dropdownAlign={{
          //   points: ["bl", "tl"], // align dropdown bottom-left to top-left of input element
          //   offset: [0, -4], // align offset
          //   overflow: {
          //     adjustX: 0,
          //     adjustY: 0, // do not auto flip in y-axis
          //   },
          // }}
          // dropDownOffset={{ x: 0, y: 0 }}
        >
          <option value="1">hello</option>
          <option value="2">hello</option>
          <option value="3">hello</option>
          <option value="4">hello</option>
          <option value="5">hello</option>
        </Select> */}
        <ul className={classes["cart-items"]}>
          {ctx.items.map((item) => (
            <CartIteam
              key={item.id}
              data={item}
              onAdd={CartItemAddHandler}
              onRemove={CartItemRemoveHandler}
            />
          ))}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{ctx.totalAmount}</span>
        </div>
        {isCheckout && <Checkout onClose={props.onClose} />}
        {!isCheckout && modalActions}
      </Modal>
    </>
  );
};
export default Cart;
