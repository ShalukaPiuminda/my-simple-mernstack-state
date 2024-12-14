import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice"; // Ensure correct path
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid warnings with redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
