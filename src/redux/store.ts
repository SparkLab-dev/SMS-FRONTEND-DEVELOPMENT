import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { combineReducers } from "redux";

// slices
import { LoginState } from "redux/Authentication/Login/LoginSlice";
import authReducer from "redux/Authentication/Login/LoginSlice";
import { AuthRegState } from "redux/Authentication/Register/RegisterSlice";
import registerSlice from "redux/Authentication/Register/RegisterSlice";
import { RegPasswordState } from "redux/Authentication/NewPassword/NewPasswordSlice";
import newPasswordSlice from "redux/Authentication/NewPassword/NewPasswordSlice";
import { ResetPasswordState } from "redux/Authentication/ResetPassword/ResetPasswordSlice";
import resetPasswordSlice from "redux/Authentication/ResetPassword/ResetPasswordSlice";

type RootState = {
  login: LoginState;
  register: AuthRegState;
  newPassword: RegPasswordState;
  resetPassword: ResetPasswordState;
};
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["login", "register", "newPassword", "resetPassword"],
};

const rootReducer = combineReducers({
  login: authReducer,
  register: registerSlice,
  newPassword: newPasswordSlice,
  resetPassword: resetPasswordSlice,
});
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "user/UserLogin/fulfilled",
          "user/registerUser/fulfilled",
          "user/newPassword/fulfilled",
          "user/resetPassword/fulfilled",
          "persist/PERSIST",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type { RootState };
