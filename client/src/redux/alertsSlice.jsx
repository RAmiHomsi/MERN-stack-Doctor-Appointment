import { createSlice } from "@reduxjs/toolkit";

/* can be written using the react useReducer hook

// Define the initial state
const initialState = {
  loading: false,
};

// Define action types
const SHOW_LOADING = "SHOW_LOADING";
const HIDE_LOADING = "HIDE_LOADING";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { loading: true };
    case HIDE_LOADING:
      return { loading: false };
    default:
      return state;
  }
};
 */
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: { loading: false },
  reducer: {
    showLoading: (state) => state.loading == true,
    hideLoading: (state) => state.loading == false,
  },
});

export const { showLoading, hideLoading } = createSlice.actions;
export default alertsSlice.reducer;
