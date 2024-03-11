import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    //for setting filterName to an array
    setFilter: (state, action) => {
      state.filters[action.payload.filterName] = action.payload.filterValue;
    },
    //for adding one single value to an filterValue
    addFilter: (state, action) => {
      if (state.filters[action.payload.filterName]) {
        state.filters[action.payload.filterName].push(
          action.payload.filterValue
        );
      } else {
        state.filters[action.payload.filterName] = [action.payload.filterValue];
      }
    },
    //todo refactor to use update or remove?
    removeFilter: (state, action) => {
      if (state.filters[action.payload.filterName]) {
        const currentFilterValue = state.filters[action.payload.filterName];
        const newFilterValue = currentFilterValue.filter(
          (v) => v !== action.payload.filterValue
        );

        if (newFilterValue.length > 0) {
          state.filters[action.payload.filterName] = newFilterValue;
        } else {
          delete state.filters[action.payload.filterName];
        }
      }
    },
    updateFilter: (state, action) => {
      if (state.filters[action.payload.filterName]) {
        state.filters[action.payload.filterName] = action.payload.filterValues;
      }
    },
  },
});

export const { setFilters, setFilter, addFilter, removeFilter, updateFilter } =
  filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
