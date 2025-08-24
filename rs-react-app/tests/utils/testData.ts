import { IUserData } from '../../src/types/interface';

export const uncontrolledFormData: IUserData = {
  name: 'Tatiana',
  age: 25,
  email: 'test@example.com',
  password: 'Strong1!',
  confirmPassword: 'Strong1!',
  gender: 'female',
  country: 'Canada',
  terms: true,
  image: 'avatar.jpg',
};

export const reactHookFormData: IUserData = {
  name: 'Alex',
  age: 30,
  email: 'alex@example.com',
  password: 'Password1!',
  confirmPassword: 'Password1!',
  gender: 'male',
  country: 'USA',
  terms: true,
  image: 'avatar2.jpg',
};
