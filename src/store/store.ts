import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authReducer from "./Auth/authSlice";
import bookingFlowReducer from "./Booking/bookingSlice";
import { baseAPI } from "./BaseApi/baseAPI";

import * as storageModule from "redux-persist/lib/storage";

const storage =
  (storageModule as any).default?.default ??
  (storageModule as any).default ??
  storageModule;
const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistedReducer,
    bookingFlow: bookingFlowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
