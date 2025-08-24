import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../types/interface';

interface FormState {
  uncontrolledFormData: IUserData | null;
  reactHookFormData: IUserData | null;
  countries: string[];
  highlight: 'uncontrolled' | 'reactHook' | null;
}

const initialState: FormState = {
  uncontrolledFormData: null,
  reactHookFormData: null,
  countries: ['United States', 'Canada', 'United Kingdom'],
  highlight: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<IUserData>) => {
      state.uncontrolledFormData = action.payload;
      state.highlight = 'uncontrolled';
    },
    setReactHookFormData: (state, action: PayloadAction<IUserData>) => {
      state.reactHookFormData = action.payload;
      state.highlight = 'reactHook';
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
    clearHighlight: (state) => {
      state.highlight = null;
    },
  },
  selectors: {
    selectUncontrolledFormData: (state) => state.uncontrolledFormData,
    selectReactHookFormData: (state) => state.reactHookFormData,
    selectCountries: (state) => state.countries,
    selectHighlight: (state) => state.highlight,
  },
});

export const {
  setUncontrolledFormData,
  setReactHookFormData,
  setCountries,
  clearHighlight,
} = formSlice.actions;

export const formReducer = formSlice.reducer;

export const {
  selectUncontrolledFormData,
  selectReactHookFormData,
  selectCountries,
} = formSlice.selectors;
