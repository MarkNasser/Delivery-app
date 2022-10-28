import MealIteam from "./MealIteam";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  //fetching meals data from backend
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsloading(true);
      const response = await fetch(
        "https://react-http-659ef-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();

      const loadMeals = [];
      for (const key in data) {
        loadMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadMeals);
      setIsloading(false);
    }
    fetchData().catch((err) => {
      setIsloading(false);
      setError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p style={{ color: "red", textAlign: "center" }}>loading meals ....</p>
      </section>
    );
  }
  // if (error) {
  //   return <p>{error}</p>;
  // }
  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.container}>
          {DUMMY_MEALS.map((meal) => (
            <MealIteam key={meal.id} data={meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
