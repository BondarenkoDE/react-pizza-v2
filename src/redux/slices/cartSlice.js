import { createSlice } from '@reduxjs/toolkit';
import reduceTotal from '../../utils/reduceTotal';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  addedPizzas: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findPizza = state.addedPizzas.find((pizza) => pizza.id === action.payload.id);

      console.log('findPizza: ', findPizza);

      if (findPizza) {
        findPizza.count++;
      } else {
        state.addedPizzas.push({ ...action.payload, count: 1 });
      }

      const { totalPrice, totalCount } = reduceTotal(state.addedPizzas);

      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    minusPizza(state, action) {
      const findPizza = state.addedPizzas.find((pizza) => pizza.id === action.payload);

      if (findPizza) {
        findPizza.count--;
      }

      const { totalPrice, totalCount } = reduceTotal(state.addedPizzas);

      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    removePizza(state, action) {
      state.addedPizzas = state.addedPizzas.filter((pizza) => pizza.id !== action.payload);

      const { totalPrice, totalCount } = reduceTotal(state.addedPizzas);

      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    clearCart(state) {
      state.totalPrice = 0;
      state.totalCount = 0;
      state.addedPizzas = [];
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartPizzasById = (id) => (state) =>
  state.cart.addedPizzas.find((pizza) => id === pizza.id);

export const { addPizza, removePizza, clearCart, minusPizza } = cartSlice.actions;

export default cartSlice.reducer;
