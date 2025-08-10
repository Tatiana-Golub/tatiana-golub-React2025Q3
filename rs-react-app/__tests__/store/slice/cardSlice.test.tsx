import { describe, it, expect } from 'vitest';
import type { ItemState } from '../../../src/store/slices/cardSlice';
import reducer, {
  selectItem,
  unselectAll,
  unselectItem,
} from '../../../src/store/slices/cardSlice';

describe('cardSlice', () => {
  const initialState: ItemState = {
    selectedItemsIds: [],
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle selectItem', () => {
    const nextState = reducer(initialState, selectItem('abys'));
    expect(nextState.selectedItemsIds).toContain('abys');
  });

  it('should not add the same item twice in selectItem', () => {
    const state: ItemState = {
      selectedItemsIds: ['abys'],
    };
    const nextState = reducer(state, selectItem('abys'));
    expect(nextState.selectedItemsIds).toEqual(['abys']);
  });

  it('should handle unselectItem', () => {
    const state: ItemState = {
      selectedItemsIds: ['abys', 'siam'],
    };
    const nextState = reducer(state, unselectItem('abys'));
    expect(nextState.selectedItemsIds).toEqual(['siam']);
  });

  it('should handle unselectAll', () => {
    const state: ItemState = {
      selectedItemsIds: ['abys', 'siam'],
    };
    const nextState = reducer(state, unselectAll());
    expect(nextState.selectedItemsIds).toEqual([]);
  });
});
