import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { combineReducers } from "redux";

// slices
import { LoginState } from "redux/Authentication/Login/LoginSlice";
import loginSlice from "redux/Authentication/Login/LoginSlice";
type RootState = {
  login: LoginState;
};
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["login"],
};

const rootReducer = combineReducers({ login: loginSlice });
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/UserLogin/fulfilled"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type { RootState };
