import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { category, search, currentPage, sort } = params;
    const { data } = await axios.get(
      `https://628268809fac04c65414925b.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=desc&${search}`,
    );

    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const selectPizzas = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
