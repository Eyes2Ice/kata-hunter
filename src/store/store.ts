import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobsReducer from "@/reducers/JobsSlice";

const rootReducer = combineReducers({
  jobsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
