import classes from "./CartIteam.module.css";

const CartIteam = (props) => {
  const add = () => {
    props.onAdd({
      id: props.data.id,
      name: props.data.name,
      price: props.data.price,
      amount: 1,
    });
  };
  const remove = () => {
    props.onRemove(props.data.id);
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.data.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{`$${props.data.price}`}</span>
          <span className={classes.amount}>{`x${props.data.amount}`}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={remove}>-</button>
        <button onClick={add}>+</button>
      </div>
    </li>
  );
};
export default CartIteam;
