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
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .required('Age required')
    .min(1, 'Age must be greater than 0'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .test('password-strength', function (value) {
      if (!value) return false;
      const errors: string[] = [];
      if (!/[0-9]/.test(value)) errors.push('number');
      if (!/[a-z]/.test(value)) errors.push('lowercase letter');
      if (!/[A-Z]/.test(value)) errors.push('uppercase letter');
      if (!/[^a-zA-Z0-9]/.test(value)) errors.push('special character');

      if (errors.length > 0) {
        return this.createError({
          message: `Password must contain ${errors.join(', ')}`,
        });
      }

      return true;
    }),

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
    .mixed<FileList>()
    .required('Required')
    .test('is-valid-type', 'Not a valid image type', (fileList) => {
      if (!fileList || fileList.length === 0) return false;
      const file = fileList[0];
      return isValidFileType(file.name.toLowerCase(), 'image');
    })
    .test('is-valid-size', 'Max allowed size is 100KB', (fileList) => {
      if (!fileList || fileList.length === 0) return false;
      const file = fileList[0];
      return file.size <= MAX_FILE_SIZE;
    }),
});
