'use client';

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

// export function makeStore() {
//   return configureStore({
//     reducer: {
//       [Api.reducerPath]: Api.reducer,
//       selectedItems: selectedItemsReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(Api.middleware),
//   });
// }

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppDispatch = AppStore['dispatch'];
// export type RootState = ReturnType<AppStore['getState']>;
