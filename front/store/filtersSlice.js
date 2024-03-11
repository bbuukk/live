import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: new Map(),
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    //for setting filterName to an array
    setFilter: (state, action) => {
      state.filters.set(action.payload.filterName, action.payload.filterValue);
    },
    //for adding one single value to an filterValue
    addFilter: (state, action) => {
      if (state.filters.has(action.payload.filterName)) {
        map.get(action.payload.filterName).push(action.payload.filterValue);
      } else {
        state.filters.set(action.payload.filterName, [
          action.payload.filterValue,
        ]);
      }
    },
    //todo refactor to use update or remove?
    removeFilter: (state, action) => {
      if (state.filters.has(action.payload.filterName)) {
        const currentFilterValue = state.filters.get(action.payload.filterName);
        const newFilterValue = currentFilterValue.filter(
          (v) => v !== action.payload.filterValue
        );

        if (newFilterValue.length > 0) {
          state.filters.set(action.payload.filterName, newFilterValue);
        } else {
          state.filters.delete(action.payload.filterName);
        }
      }
    },
    updateFilter: (state, action) => {
      if (state.filters.has(action.payload.filterName)) {
        state.filters.set(
          action.payload.filterName,
          action.payload.filterValues
        );
      }
    },
  },
});

export const { setFilters, setFilter, addFilter, removeFilter, updateFilter } =
  filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
