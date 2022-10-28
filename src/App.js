import React, { useState } from "react";

import Header from "./components/header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCart, setIsCart] = useState(false);
  const cartToggelHandler = () => {
    setIsCart((prev) => !prev);
  };

  return (
    <CartProvider>
      <Header onOpen={cartToggelHandler} />
      {isCart && <Cart onClose={cartToggelHandler} />}
      <Meals />
    </CartProvider>
  );
}

export default App;
