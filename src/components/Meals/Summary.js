import classes from "./Summary.module.css";

const Summary = () => {
  return (
    <div className={classes.summary}>
      <h2>Delicious Food, Deliverd To You</h2>
      <p>
        choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner home.
      </p>
      <p>
        All our meals are cooked with high-quality ingrediants, just-in-time and
        of course by experienced chefs !
      </p>
    </div>
  );
};

export default Summary;
