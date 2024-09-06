import { configureStore, createSlice } from "@reduxjs/toolkit";

const goodsSlice = createSlice({
  name: "goodsSlice",
  initialState: {
    title: "redux toolkit",
    count: 0,
  },
  reducers: {
    addCount(state) {
      state.count += 1;
    },
  },
});

const tabSlice = createSlice({
  name: "tabSlice",
  initialState: {
    tabIndex: 0,
  },
  reducers: {
    setTabIndex(state, action) {
      state.tabIndex = action.payload;
    },
    setTabIndexByPath(state, action) {
      const path = action.payload;
      if (path === "/") {
        state.tabIndex = 0;
      } else if (path === "/leaderboard") {
        state.tabIndex = 1;
      } else if (path === "/friends") {
        state.tabIndex = 2;
      } else {
        state.tabIndex = 0;
      }
    },
  },
});

export const { setTabIndex, setTabIndexByPath } = tabSlice.actions;

export default configureStore({
  reducer: {
    goods: goodsSlice.reducer,
    tab: tabSlice.reducer,
  },
});
