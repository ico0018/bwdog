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

export default configureStore({
  reducer: {
    goods: goodsSlice.reducer,
  },
});
