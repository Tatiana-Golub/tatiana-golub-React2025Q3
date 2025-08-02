import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './cardSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
