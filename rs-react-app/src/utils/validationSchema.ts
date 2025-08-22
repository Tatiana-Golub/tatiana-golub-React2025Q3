import * as yup from 'yup';

const MAX_FILE_SIZE = 102400;

const validFileExtensions: Record<'image', string[]> = {
  image: ['jpg', 'png', 'jpeg'],
};

function isValidFileType(
  fileName: string | undefined,
  fileType: keyof typeof validFileExtensions
): boolean {
  if (!fileName) return false;
  const ext = fileName.split('.').pop()?.toLowerCase();
  return ext ? validFileExtensions[fileType].includes(ext) : false;
}

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be uppercase'),
  age: yup
    .string()
    .required('Age is required')
    .test('is-number', 'Age must be a number', (value) => !isNaN(Number(value)))
    .test(
      'non-negative',
      'Age cannot be negative',
      (value) => Number(value) >= 0
    ),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[^a-zA-Z0-9]/, 'Must contain a special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: yup.string().required('Please select gender'),
  country: yup.string().required('Please select a country'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept Terms and Conditions')
    .required('You must accept Terms and Conditions'),
  image: yup
    .mixed<File>()
    .required('Required')
    .test('is-valid-type', 'Not a valid image type', (file) =>
      file instanceof File
        ? isValidFileType(file.name.toLowerCase(), 'image')
        : false
    )
    .test('is-valid-size', 'Max allowed size is 100KB', (file) =>
      file instanceof File ? file.size <= MAX_FILE_SIZE : false
    ),
});
