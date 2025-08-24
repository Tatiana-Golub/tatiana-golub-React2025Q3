import { SubmitHandler, useForm } from 'react-hook-form';
import '../shared/Form.css';
import { IFormInput } from '../../types/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCountries,
  setReactHookFormData,
} from '../../store/slices/formSlice';
import { formDataToUserData } from '../../utils/dataConverter';

interface ReactHookFormProps {
  onSubmitSuccess?: () => void;
}

export function ReactHookForm({ onSubmitSuccess }: ReactHookFormProps) {
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const selectedFile = watch('image');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const userData = await formDataToUserData(data);
    dispatch(setReactHookFormData(userData));
    onSubmitSuccess?.();
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">React Hook Form</h2>
        <div className="form-group full-width">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name ? (
            <p className="error" data-testid="name-error">
              {errors.name.message}
            </p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          {errors.age ? (
            <p className="error">{errors.age.message}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email ? (
            <p className="error" data-testid="email-error">
              {errors.email.message}
            </p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password ? (
            <p className="error">{errors.password.message}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword ? (
            <p className="password-error">{errors.confirmPassword.message}</p>
          ) : (
            <p className="password-error">&nbsp;</p>
          )}
        </div>

        <div className="radio-group full-width">
          <p className="radio-title">Gender</p>
          <div className="radio-options">
            <label htmlFor="male" className="radio-option">
              <input
                type="radio"
                value="male"
                {...register('gender')}
                id="male"
              />
              Male
            </label>
            <label htmlFor="female" className="radio-option">
              <input
                type="radio"
                value="female"
                {...register('gender')}
                id="female"
              />
              Female
            </label>
          </div>
          {errors.gender ? (
            <p className="error">{errors.gender.message}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="country-group full-width">
          <label htmlFor="country">Country</label>
          <select id="country" {...register('country')}>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country ? (
            <p className="error">{errors.country.message}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="image">Upload Image</label>
          <div className="file-input">
            <input
              id="image"
              type="file"
              accept=".png, .jpeg, .jpg"
              {...register('image')}
            />
            <span className="file-button">Choose File</span>
            <span className="file-name">
              {selectedFile && selectedFile.length > 0
                ? 'File uploaded'
                : 'Upload a file'}
            </span>
          </div>
          {errors.image ? (
            <p className="error">{errors.image.message}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="checkbox-group">
          <label htmlFor="terms">
            <input id="terms" type="checkbox" {...register('terms')} />
            Accept Terms & Conditions.
          </label>
          {errors.terms ? (
            <p className="error">{errors.terms.message}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-submit full-width">
          <input type="submit" value="Submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
}
