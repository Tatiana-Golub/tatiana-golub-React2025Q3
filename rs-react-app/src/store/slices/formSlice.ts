import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from '../../types/interface';

interface FormState {
  uncontrolledFormData: IFormInput | null;
  reactHookFormData: IFormInput | null;
  countries: string[];
}

const initialState: FormState = {
  uncontrolledFormData: null,
  reactHookFormData: null,
  countries: ['United States', 'Canada', 'United Kingdom'],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<IFormInput>) => {
      state.uncontrolledFormData = action.payload;
    },
    setReactHookFormData: (state, action: PayloadAction<IFormInput>) => {
      state.reactHookFormData = action.payload;
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
  selectors: {
    selectUncontrolledFormData: (state) => state.uncontrolledFormData,
    selectReactHookFormData: (state) => state.reactHookFormData,
    selectCountries: (state) => state.countries,
  },
});

export const { setUncontrolledFormData, setReactHookFormData, setCountries } =
  formSlice.actions;

export const formReducer = formSlice.reducer;

export const {
  selectUncontrolledFormData,
  selectReactHookFormData,
  selectCountries,
} = formSlice.selectors;
