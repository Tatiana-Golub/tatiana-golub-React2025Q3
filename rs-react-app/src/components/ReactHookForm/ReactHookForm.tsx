import { useForm } from 'react-hook-form';
import '../shared/Form.css';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList;
  terms: boolean;
}

export function ReactHookForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={() => console.log}>
        <h2 className="form-title">React Hook Form</h2>
        <div className="form-group full-width">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group half-width">
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>

        <div className="form-group half-width">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group half-width">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
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
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        <div className="country-group full-width">
          <label htmlFor="country">Country</label>
          <select id="country" {...register('country')}>
            <option value="">--Select Country--</option>
          </select>
          {errors.country && <p className="error">{errors.country.message}</p>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="picture">Upload Picture</label>
          <div className="file-input">
            <input
              id="picture"
              type="file"
              accept=".png, .jpeg, .jpg"
              {...register('picture')}
            />
            <span className="file-button">Choose File</span>
          </div>
          {errors.picture && <p className="error">{errors.picture.message}</p>}
        </div>

        <div className="checkbox-group">
          <label htmlFor="terms">
            <input id="terms" type="checkbox" {...register('terms')} />
            Accept Terms & Conditions.
          </label>
          {errors.terms && <p className="error">{errors.terms.message}</p>}
        </div>

        <div className="form-submit full-width">
          <input type="submit" value="Submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
}
