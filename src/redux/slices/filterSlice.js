import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
