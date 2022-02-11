import { configureStore } from "@reduxjs/toolkit";

import cartReduser from "./cart-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: { cart: cartReduser, ui: uiReducer },
});

export default store;
