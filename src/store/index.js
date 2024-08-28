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
  },
});

export const { setTabIndex } = tabSlice.actions;

export default configureStore({
  reducer: {
    goods: goodsSlice.reducer,
    tab: tabSlice.reducer,
  },
});
