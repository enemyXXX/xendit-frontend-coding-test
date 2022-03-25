import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MainReducer from '../../pages/main/services/mainSlice';

export const store = configureStore({
  reducer: {
    main: MainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
