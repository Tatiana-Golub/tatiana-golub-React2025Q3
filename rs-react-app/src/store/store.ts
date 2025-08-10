import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './slices/cardSlice';
import { Api } from './api/Api';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
