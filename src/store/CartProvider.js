import CartContext from "./cart-context";
import React, { useReducer } from "react";

const defaultCartState = { items: [], totalAmount: 0, units: 0 };

const reducerFn = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotal =
      //last total + (12.99 * iteams amount)
      state.totalAmount + action.iteam.price * action.iteam.amount;

    //findindex in iteam array on => id of comind action
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.iteam.id
    );

    let updatedItems;

    if (existingCartItemIndex !== -1) {
      //if the id is existed before
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = {
        ...state.items[existingCartItemIndex],
        amount: state.items[existingCartItemIndex].amount + action.iteam.amount,
      };
    } else {
      // i'm using concat instead of push to avoid manitain the original array
      // updatedItems = [...state.items, action.iteam];
      updatedItems = state.items.concat(action.iteam);
    }
    return {
      items: updatedItems,
      totalAmount: +updatedTotal.toFixed(2),
      units: updatedItems.reduce((acc, curr) => acc + +curr.amount, 0),
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
    }
    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount.toFixed(2),
      units: updatedItems.reduce((acc, curr) => acc + +curr.amount, 0),
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, cartStateFn] = useReducer(reducerFn, defaultCartState);

  const addItemToCartHandler = (iteamObj) => {
    cartStateFn({ type: "ADD", iteam: iteamObj });
  };

  const removeItemFromCartHandler = (id) => {
    cartStateFn({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    units: cartState.units,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
