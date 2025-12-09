import { configureStore } from "@reduxjs/toolkit";
import botsReducer from "./botsSlice";
import { metricsApi } from "./metricsApi";

export const store = configureStore({
  reducer: {
    bots: botsReducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metricsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
