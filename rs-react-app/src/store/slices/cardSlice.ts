import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ItemState {
  selectedItemsIds: string[];
}

const initialState: ItemState = {
  selectedItemsIds: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (!state.selectedItemsIds.includes(itemId))
        state.selectedItemsIds.push(itemId);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.selectedItemsIds = state.selectedItemsIds.filter(
        (id) => id !== itemId
      );
    },
    unselectAll: (state) => {
      state.selectedItemsIds = [];
    },
  },

  selectors: {
    selectSelectedItemsIds: (state) => state.selectedItemsIds,
  },
});

export default selectedItemsSlice.reducer;
export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;

export const { selectSelectedItemsIds } = selectedItemsSlice.selectors;
