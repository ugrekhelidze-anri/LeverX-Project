import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { usersApiSlice } from "../features/user/usersApiSlice";

export const store = configureStore({
  // reducers for rtk
  reducer: {
    user: userReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  // middleware for rtk query caches
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
