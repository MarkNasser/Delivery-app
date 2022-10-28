import classes from "./MealIteam.module.css";
import Input from "../UI/Input";
import React, { useContext, useRef, useState } from "react";
import CartContext from "../../store/cart-context";

const MealIteam = (props) => {
  const ctx = useContext(CartContext);
  const inputVal = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const onSaveHandler = (e) => {
    e.preventDefault();
    const enterdAmount = inputVal.current.value;
    if (
      enterdAmount.trim().length === 0 ||
      +enterdAmount < 1 ||
      +enterdAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    const addToCard = {
      //   id: props.data.id,
      //   name: props.data.name,
      //   price: props.data.price,
      ...props.data,
      amount: +enterdAmount,
    };
    ctx.addItem(addToCard);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.data.name}</h3>
        <i>{props.data.description}</i>
        <p className={classes.price}>{`$${props.data.price}`}</p>
      </div>
      <form onSubmit={onSaveHandler}>
        <Input
          ref={inputVal}
          label="Amount"
          input={{
            id: "amount" + props.data.id,
            type: "number",
            min: "1",
            max: "5",
            defaultValue: "1",
          }}
        />
        {!amountIsValid && <p style={{ color: "red" }}>enter a valid num</p>}
        <button type="submit">+ Add</button>
      </form>
    </li>
  );
};
export default MealIteam;
