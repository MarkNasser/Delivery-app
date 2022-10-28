import React, { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import Summary from "./Summary";

const Meals = () => {
  return (
    <React.Fragment>
      <Summary />
      <AvailableMeals />
    </React.Fragment>
  );
};
export default Meals;
